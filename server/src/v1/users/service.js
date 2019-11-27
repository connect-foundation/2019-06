import generator from 'generate-password';

import DB from '../../database';
import ErrorResponse from '../../libraries/exception/error-response';
import ERROR_CODE from '../../libraries/exception/error-code';
import mailUtil from '../../libraries/mail-util';
import { encrypt } from '../../libraries/crypto';

const DEFAULT_CATEGORIES = ['전체메일함', '받은메일함', '보낸메일함', '내게쓴메일함', '휴지통'];
const TEMP_PASSWORD_LENGTH = 15;

// eslint-disable-next-line camelcase
const register = async ({ id, password, name, sub_email }) => {
  const userData = { id, password, name, sub_email };
  let newUser;

  try {
    await DB.sequelize.transaction(async transaction => {
      const [response, created] = await DB.User.findOrCreateById(userData, { transaction });
      if (!created) {
        throw new ErrorResponse(ERROR_CODE.ID_DUPLICATION);
      }
      newUser = response.get({ plain: true });
      await createDefaultCategories(newUser.no, transaction);
    });
  } catch (error) {
    throw error;
  }

  delete newUser.password;
  delete newUser.salt;

  return newUser;
};

const updatePassword = async (no, salt, password) => {
  const hashedPassword = await encrypt(password, salt);
  await DB.User.updatePassword(no, hashedPassword);

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

const getCategories = async user => {
  if (!user) {
    throw new ErrorResponse(ERROR_CODE.UNAUTHORIZED);
  }
  const categories = await DB.Category.findAllByUserNo(user.no);
  return { categories };
};

export default {
  register,
  updatePassword,
  createDefaultCategories,
  sendUserIdToEmail,
  sendUserPasswordToEmail,
  getCategories,
};
