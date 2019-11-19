import ErrorResponse from '../libraries/exception/error-response';
import ErrorCode from '../libraries/exception/error-code';

const isAuth = (req, res, next) => {
  // if (!req.isAuthenticated()) {
  if (!req.user) {
    return next(new ErrorResponse(ErrorCode.UNAUTHORIZED));
  }
  return next();
};

export { isAuth };
