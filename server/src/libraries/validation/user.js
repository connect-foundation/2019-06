import DB from '../../database';
import getErrorResponseBySequelizeValidationError from '../exception/sequelize-error-parser';

const join = async body => {
  try {
    if (body.name) {
      body.name = body.name.trim();
    }
    await DB.User.build(body).validate();
  } catch (error) {
    throw getErrorResponseBySequelizeValidationError(error);
  }

  return true;
};

export default { join };
