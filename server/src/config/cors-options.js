import ErrorResponse from '../libraries/exception/error-response';
import ERROR_CODE from '../libraries/exception/error-code';

const corsErrorResponse = new ErrorResponse(ERROR_CODE.NOT_ALLOWED_BY_CORS);
const { FRONTEND_SERVER_ADDRESS } = process.env;

const whitelist = {
  [FRONTEND_SERVER_ADDRESS]: true,
  'https://daitnu.com': true,
  'https://www.daitnu.com': true,
};

const corsOptions = {
  origin(origin, callback) {
    return whitelist[origin] || !origin ? callback(null, true) : callback(corsErrorResponse);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
};

export default corsOptions;
