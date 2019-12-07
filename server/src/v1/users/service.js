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
    const [{ type, path, value }] = error.errors;
    if (type === 'unique violation' && path === 'sub_email') {
      const errorField = new ErrorField('sub_email', value, '이미 가입에 사용한 이메일 입니다.');
      throw new ErrorResponse(ERROR_CODE.ID_OR_SUB_EMAIL_DUPLICATION, errorField);
    }
  }
  throw error;
};

const makeUniqueFieldsError = (response, userData) => {
  const errorFields = [];
  let errorField;

  if (response.id === userData.id) {
    errorField = new ErrorField('id', userData.id, '이미 사용중인 아이디 입니다.');
    errorFields.push(errorField);
  }
  if (response.sub_email === userData.sub_email) {
    errorField = new ErrorField(
      'sub_email',
      userData.sub_email,
      '이미 가입에 사용한 이메일 입니다.',
    );
    errorFields.push(errorField);
  }

  if (errorFields.length > 0) {
    throw new ErrorResponse(ERROR_CODE.ID_OR_SUB_EMAIL_DUPLICATION, errorFields);
  }

  return true;
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
        throw makeUniqueFieldsError(response, userData);
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
