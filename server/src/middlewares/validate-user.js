import ErrorResponse from '../libraries/error-response';
import ErrorCode from '../libraries/error-code';
import { checkUser } from '../libraries/validator';

const validateUser = (req, res, next) => {
  if (!checkUser(req.body)) {
    return next(new ErrorResponse(ErrorCode.INVALID_INPUT_VALUE));
  }
  return next();
};

export { validateUser };
