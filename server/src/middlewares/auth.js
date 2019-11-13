import ErrorResponse from '../libraries/error-response';
import ErrorCode from '../libraries/error-code';

const isAuth = (req, res, next) => {
  // if (!req.isAuthenticated()) {
  if (!req.user) {
    return next(new ErrorResponse(ErrorCode.UNAUTHORIZED));
  }
  return next();
};

export { isAuth };
