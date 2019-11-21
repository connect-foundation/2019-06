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
      'type에 아이디를 찾을 경우 id나 비밀전호를 찾을 경우 pw를 넣어주어야 합니다.',
    );
    errorFields.push(errorField);
  }

  if (errorFields.length > 0) {
    throw new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE, errorFields);
  }

  return true;
};

const checkBodyForIdSearch = ({ email }) => {
  const errorFields = [];

  if (!email) {
    const errorField = new ErrorField('email', email, 'email 값이 존재하지 않습니다');
    errorFields.push(errorField);
  } else if (!validate('email', email)) {
    const errorField = new ErrorField('email', email, 'email 값이 올바르지 않습니다.');
    errorFields.push(errorField);
  }

  if (errorFields.length > 0) {
    throw new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE, errorFields);
  }

  return true;
};

export default { join, checkQueryForSearch, checkBodyForIdSearch };
