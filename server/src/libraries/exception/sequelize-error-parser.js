import ErrorResponse from '../error-response';
import ERROR_CODE from '../error-code';
import ErrorField from '../error-field';

const getErrorResponseBySequelizeValidationError = error => {
  const errorFileds = [];
  for (const errorFiled of error.errors) {
    const { message, path, value } = errorFiled;
    const errorField = new ErrorField(path, value, message);
    errorFileds.push(errorField);
  }
  throw new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE, errorFileds);
};

export default getErrorResponseBySequelizeValidationError;
