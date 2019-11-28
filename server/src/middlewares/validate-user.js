import ErrorResponse from '../libraries/exception/error-response';
import ErrorCode from '../libraries/exception/error-code';
import { checkUser } from '../libraries/validation/common';

const validateUser = (req, res, next) => {
  if (!checkUser(req.body)) {
    return next(new ErrorResponse(ErrorCode.INVALID_INPUT_VALUE));
  }
  return next();
};

export { validateUser };
