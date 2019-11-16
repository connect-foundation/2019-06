import ErrorResponse from '../libraries/error-response';
import ErrorCode from '../libraries/error-code';
import { checkLoginForm } from '../libraries/validator';

const validateLogin = (req, res, next) => {
  if (!checkLoginForm(req.body)) {
    return next(new ErrorResponse(ErrorCode.INVALID_INPUT_VALUE));
  }
  return next();
};

export { validateLogin };
