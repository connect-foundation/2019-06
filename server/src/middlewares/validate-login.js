import ErrorResponse from '../libraries/exception/error-response';
import ErrorCode from '../libraries/exception/error-code';
import { checkLoginForm } from '../libraries/validation/common';

const validateLogin = (req, res, next) => {
  if (!checkLoginForm(req.body)) {
    return next(new ErrorResponse(ErrorCode.INVALID_LOGIN_ID_OR_PASSWORD));
  }
  return next();
};

export { validateLogin };
