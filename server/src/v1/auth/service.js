import bcrypt from 'bcrypt';
import crypto from 'crypto';

import DB from '../../database/index';
import ERROR_CODE from '../../libraries/exception/error-code';
import ErrorResponse from '../../libraries/exception/error-response';

const localLogin = async ({ id, password }) => {
  const user = await DB.User.findOneById(id);

  if (!user) {
    throw new ErrorResponse(ERROR_CODE.INVALID_LOGIN_ID_OR_PASSWORD);
  }

  const hashedPassword = crypto
    .createHash('sha512')
    .update(password)
    .digest('base64');
  const match = user.password === hashedPassword;

  if (!match) {
    throw new ErrorResponse(ERROR_CODE.INVALID_LOGIN_ID_OR_PASSWORD);
  }

  return user;
};

export default { localLogin };
