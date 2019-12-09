import generator from 'generate-password';

import DB from '../../database';
import ErrorResponse from '../../libraries/exception/error-response';
import ErrorField from '../../libraries/exception/error-field';
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

const throwUniqueFieldsError = ({ isIdUniqueError, isSubEmailUniqueError }) => {
  if (isIdUniqueError && isSubEmailUniqueError) {
    throw new ErrorResponse(ERROR_CODE.ID_AND_SUB_EMAIL_DUPLICATION);
  } else if (isIdUniqueError) {
    throw new ErrorResponse(ERROR_CODE.ID_DUPLICATION);
  } else if (isSubEmailUniqueError) {
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
      const [response, created] = await DB.User.findOrCreateById(userData, { transaction });
      if (!created) {
        throwUniqueFieldsError({
          isIdUniqueError: response.id === userData.id,
          isSubEmailUniqueError: response.sub_email === userData.sub_email,
        });
      }
      newUser = response.get({ plain: true });
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
