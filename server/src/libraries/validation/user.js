import DB from '../../database';
import getErrorResponseBySequelizeValidationError from '../exception/sequelize-error-parser';
import ERROR_CODE from '../exception/error-code';
import ErrorField from '../exception/error-field';
import ErrorResponse from '../exception/error-response';
import { validate } from '../validator';

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

  if (!type || (type !== 'id' && type !== 'pw')) {
    const errorField = new ErrorField(
      'type',
      type,
      'type값은 아이디를 찾을 경우 "id" 비밀번호를 찾을 경우 "pw"여야 합니다.',
    );
    errorFields.push(errorField);
    throw new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE, errorFields);
  }

  return true;
};

const checkBodyForIdSearch = ({ email }) => {
  if (!email || !validate('email', email)) {
    const errorField = new ErrorField('email', email, 'email 값이 올바르지 않습니다.');
    throw new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE, [errorField]);
  }

  return true;
};

const checkBodyForPasswordSearch = ({ id, email }) => {
  const errorFields = [];

  if (!id || !validate('id', id)) {
    const errorField = new ErrorField('id', id, 'id 값이 올바르지 않습니다.');
    errorFields.push(errorField);
  }

  if (!email || !validate('email', email)) {
    const errorField = new ErrorField('email', email, 'email 값이 올바르지 않습니다.');
    errorFields.push(errorField);
  }

  if (errorFields.length > 0) {
    throw new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE, errorFields);
  }

  return true;
};

export default { join, checkQueryForSearch, checkBodyForIdSearch, checkBodyForPasswordSearch };
