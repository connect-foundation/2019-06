import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';

import COOKIE_CONFIG from './libraries/config/cookie';
import v1 from './v1/index';
import ErrorResponse from './libraries/error-response';
import ERROR_CODE from './libraries/error-code';

dotenv.config();

const app = express();
const { SESSION_SECRET, COOKIE_SECRET } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(COOKIE_SECRET));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: COOKIE_CONFIG,
  }),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(helmet());
app.set('trust proxy', 1);
app.use('/v1', v1);

app.use((req, res, next) => next(new ErrorResponse(ERROR_CODE.PAGE_NOT_FOUND)));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.errorCode) {
    const status = Number(err.errorCode.status);
    return res.status(status).json(err);
  }

  return res.status(500).json(new ErrorResponse(ERROR_CODE.INTERNAL_SERVER_ERROR));
});

export default app;
