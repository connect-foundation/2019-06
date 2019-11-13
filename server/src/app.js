import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import v1 from './v1/index';
import ERROR_CODE from './libraries/error-code';
import ErrorResponse from './libraries/error-response';

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(passport.initialize());
app.use(passport.session());

app.set('trust proxy', 1);
app.use('/v1', v1);

app.use((req, res, next) => {
  const error = new Error('404 PAGE NOT FOUND');
  error.status = 404;
  return next(error);
});

app.use((err, req, res, next) => {
  if (err.errorCode) {
    const status = Number(err.errorCode.status);
    return res.status(status).json(err);
  }

  return res.status(500).json(new ErrorResponse(ERROR_CODE.INTERNAL_SERVER_ERROR));
});

export default app;
