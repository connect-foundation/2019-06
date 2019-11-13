import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import v1 from './v1/index';
import ErrorResponse from './libraries/error-response';
import ERROR_CODE from './libraries/error-code';

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.set('trust proxy', 1);
app.use('/v1', v1);

app.use((req, res, next) => next(new ErrorResponse(ERROR_CODE.PAGE_NOT_FOUND)));
app.use((err, req, res) => {
  if (err.errorCode) {
    const status = Number(err.errorCode.status);
    return res.status(status).json(err);
  }

  return res.status(500).json(new ErrorResponse(ERROR_CODE.INTERNAL_SERVER_ERROR));
});

export default app;
