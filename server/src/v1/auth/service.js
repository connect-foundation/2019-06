import bcrypt from 'bcrypt';

import DB from '../../database/index';
import ERROR_CODE from '../../libraries/error-code';
import ErrorResponse from '../../libraries/error-response';

const localLogin = async ({ id, password }) => {
  const user = await DB.User.findOneById(id);

  if (!user) {
    throw new ErrorResponse(ERROR_CODE.USER_NOT_FOUND);
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new ErrorResponse(ERROR_CODE.INVALID_LOGIN_PASSWORD);
  }

  return user;
};

export default { localLogin };
