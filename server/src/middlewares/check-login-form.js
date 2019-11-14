import ErrorResponse from '../libraries/error-response';
import ErrorCode from '../libraries/error-code';
import validator from '../libraries/validator';

const checkLoginForm = (req, res, next) => {
  if (!validator.checkLoginForm(req.body)) {
    return next(new ErrorResponse(ErrorCode.INVALID_INPUT_VALUE));
  }
  return next();
};

export { checkLoginForm };
