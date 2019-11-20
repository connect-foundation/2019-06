import bcrypt from 'bcrypt';

import DB from '../../database/index';
import ERROR_CODE from '../../libraries/exception/error-code';
import ErrorResponse from '../../libraries/exception/error-response';

const localLogin = async ({ id, password }) => {
  const user = await DB.User.findOneById(id);

  if (!user) {
    throw new ErrorResponse(ERROR_CODE.INVALID_LOGIN_ID_OR_PASSWORD);
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new ErrorResponse(ERROR_CODE.INVALID_LOGIN_ID_OR_PASSWORD);
  }

  return user;
};

export default { localLogin };
