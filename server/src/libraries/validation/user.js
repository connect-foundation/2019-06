import DB from '../../database';
import getErrorResponseBySequelizeValidationError from '../exception/sequelize-error-parser';
import ERROR_CODE from '../exception/error-code';
import ErrorField from '../exception/error-field';
import ErrorResponse from '../exception/error-response';

const join = async body => {
  if (body.name) {
    body.name = body.name.trim();
  }

  try {
    await DB.User.build(body).validate();
  } catch (error) {
    throw getErrorResponseBySequelizeValidationError(error);
  }

  return true;
};

const checkQueryForSearch = ({ type }) => {
  const errorFields = [];

  if (type !== 'id' && type !== 'pw') {
    const errorField = new ErrorField(
      'type',
      type,
      'type은 아이디를 찾을 경우 id, 비밀번호를 찾을 경우 pw여야 합니다.',
    );
    errorFields.push(errorField);
  }

  if (errorFields.length > 0) {
    throw new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE, errorFields);
  }

  return true;
};

export default { join, checkQueryForSearch };
