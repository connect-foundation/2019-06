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
      const errorField = new ErrorField('email', sub_email, '이미 가입에 사용한 이메일 입니다.');
      throw new ErrorResponse(ERROR_CODE.ID_OR_SUB_EMAIL_DUPLICATION, errorField);
    }
  }
  throw error;
};

const throwUniqueFieldsError = (users, id, sub_email) => {
  const errorFields = users.reduce((acc, user) => {
    if (user.id === id) {
      acc.push(new ErrorField('id', id, '이미 사용중인 아이디 입니다.'));
    }
    if (user.sub_email === sub_email) {
      acc.push(new ErrorField('email', sub_email, '이미 가입에 사용한 이메일 입니다.'));
    }
    return acc;
  }, []);

  throw new ErrorResponse(ERROR_CODE.ID_OR_SUB_EMAIL_DUPLICATION, errorFields);
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
