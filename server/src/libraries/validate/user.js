import DB from '../../database';
import getErrorResponseBySequelizeValidationError from '../exception/sequelize-error-parser';

const join = async body => {
  try {
    await DB.User.build(body).validate();
  } catch (error) {
    throw getErrorResponseBySequelizeValidationError(error);
  }

  return true;
};

export { join };
