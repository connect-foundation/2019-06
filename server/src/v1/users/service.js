import DB from '../../database';
import ErrorResponse from '../../libraries/exception/error-response';
import ERROR_CODE from '../../libraries/exception/error-code';

// eslint-disable-next-line camelcase
const register = async ({ user_id, password, name, sub_email }) => {
  const userData = { user_id, password, name, sub_email };

  const [response, created] = await DB.User.findOrCreateById(userData);

  if (!created) {
    throw new ErrorResponse(ERROR_CODE.ID_DUPLICATION);
  }

  const newUser = response.get({ plain: true });
  delete newUser.password;
  return newUser;
};

export default { register };
