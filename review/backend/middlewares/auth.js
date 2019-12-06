import ErrorResponse from '../libraries/exception/error-response';
import ErrorCode from '../libraries/exception/error-code';

const { ADMIN_KEY } = process.env;

const isAuth = (req, res, next) => {
  if (!req.user) {
    return next(new ErrorResponse(ErrorCode.UNAUTHORIZED));
  }
  return next();
};

const isAdmin = (req, res, next) => {
  if (!req.body.key || req.body.key !== ADMIN_KEY) {
    return next(new ErrorResponse(ErrorCode.PRIVATE_PATH));
  }

  return next();
};

export { isAuth, isAdmin };
