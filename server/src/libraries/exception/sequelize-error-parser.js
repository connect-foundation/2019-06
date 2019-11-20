/* eslint-disable max-len */
import ErrorResponse from './error-response';
import ERROR_CODE from './error-code';
import ErrorField from './error-field';

const getErrorResponseBySequelizeValidationError = ({ errors }) => {
  const errorFields = errors.map(
    ({ path, value, message }) => new ErrorField(path, value, message),
  );
  return new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE, errorFields);
};

export default getErrorResponseBySequelizeValidationError;
