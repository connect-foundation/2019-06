import sequelize from 'sequelize';
import DB from '../../database/index';
import ERROR_CODE from '../../libraries/exception/error-code';
import ErrorResponse from '../../libraries/exception/error-response';

const localLogin = async ({ id, password }) => {
  const user = await DB.User.findOneById(id);

  if (!user) {
    throw new ErrorResponse(ERROR_CODE.INVALID_LOGIN_ID_OR_PASSWORD);
  }

  const [result] = await DB.sequelize.query(
    `SELECT ENCRYPT('${password}', CONCAT('$6$', '${user.salt}'))`,
    { raw: true, type: sequelize.QueryTypes.SELECT },
  );
  const [key] = Object.keys(result);
  const hashedPassword = result[key].toString();

  const match = user.password === hashedPassword;

  if (!match) {
    throw new ErrorResponse(ERROR_CODE.INVALID_LOGIN_ID_OR_PASSWORD);
  }

  return user;
};

export default { localLogin };
