import generator from 'generate-password';

import DB from '../../database';
import ErrorResponse from '../../libraries/exception/error-response';
import ERROR_CODE from '../../libraries/exception/error-code';
import mailUtil from '../../libraries/mail-util';
import { encrypt, aesEncrypt } from '../../libraries/crypto';

const DEFAULT_CATEGORIES = ['받은메일함', '보낸메일함', '내게쓴메일함', '휴지통'];
const TEMP_PASSWORD_LENGTH = 15;

const checkSubEmailUniqueConstraintError = error => {
  if (error.errors) {
    const [{ type, path }] = error.errors;
    if (type === 'unique violation' && path === 'sub_email') {
      throw new ErrorResponse(ERROR_CODE.SUB_EMAIL_DUPLICATION);
    }
  }
  throw error;
};

const throwUniqueFieldsError = (users, id, sub_email) => {
  if (users.length >= 2) {
    throw new ErrorResponse(ERROR_CODE.ID_AND_SUB_EMAIL_DUPLICATION);
  } else if (users[0].id === id && users[0].sub_email === sub_email) {
    throw new ErrorResponse(ERROR_CODE.ID_AND_SUB_EMAIL_DUPLICATION);
  } else if (users[0].id === id) {
    throw new ErrorResponse(ERROR_CODE.ID_DUPLICATION);
  } else if (users[0].sub_email === sub_email) {
    throw new ErrorResponse(ERROR_CODE.SUB_EMAIL_DUPLICATION);
  }
};

const createDefaultCategories = async (no, transaction) => {
  const categories = DEFAULT_CATEGORIES.map(name => ({
    user_no: no,
    is_default: true,
    name,
  }));
  await DB.Category.bulkCreate(categories, { transaction });
};

// eslint-disable-next-line camelcase
const register = async ({ id, password, name, sub_email }) => {
  const userData = { id, password, name, sub_email };
  let newUser;

  try {
    await DB.sequelize.transaction(async transaction => {
      const users = await DB.User.findAllUserByIdAndSubEmail(userData, { transaction });
      if (users.length !== 0) {
        throwUniqueFieldsError(users, id, sub_email);
      }
      newUser = await DB.User.create(userData, { transaction });
      newUser = newUser.get({ plain: true });
      await createDefaultCategories(newUser.no, transaction);
    });
  } catch (error) {
    checkSubEmailUniqueConstraintError(error);
  }

  return newUser;
};

const updatePassword = async (no, salt, password) => {
  const hashedPassword = await encrypt(password, salt);
  const imapPassword = aesEncrypt(password);

  await DB.User.updatePassword(no, hashedPassword, imapPassword);

  return true;
};

const sendUserIdToEmail = async email => {
  const user = await DB.User.findOneByEmail(email);

  if (!user) {
    throw new ErrorResponse(ERROR_CODE.EMAIL_NOT_FOUND);
  }

  mailUtil.sendMailToFindId({ id: user.id, email: user.sub_email });

  return true;
};

const sendUserPasswordToEmail = async (id, email) => {
  const user = await DB.User.findOneByIdAndSubEmail(id, email);
  if (!user) {
    throw new ErrorResponse(ERROR_CODE.LOGIN_ID_OR_EMAIL_NOT_FOUND);
  }

  const newPassword = generator.generate({
    length: TEMP_PASSWORD_LENGTH,
    numbers: true,
  });

  const hashedPassword = await encrypt(newPassword, user.salt);

  user.password = hashedPassword;
  await user.save({ validate: false });

  mailUtil.sendMailToFindPassword({ id: user.id, password: newPassword, email: user.sub_email });

  return true;
};

export default {
  register,
  updatePassword,
  createDefaultCategories,
  sendUserIdToEmail,
  sendUserPasswordToEmail,
};
