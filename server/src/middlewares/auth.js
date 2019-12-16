import ErrorResponse from '../libraries/exception/error-response';
import ErrorCode from '../libraries/exception/error-code';

const { ADMIN_KEY, WHITELIST } = process.env;
const whitelist = WHITELIST.split(',');

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

const isWhitelistIp = (req, res, next) => {
  if (!whitelist.some(ip => ip === req.connection.remoteAddress)) {
    return next(new ErrorResponse(ErrorCode.PRIVATE_PATH));
  }

  return next();
};

export { isAuth, isAdmin, isWhitelistIp };
