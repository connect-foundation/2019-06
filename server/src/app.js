import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';

import morgan from 'morgan';
import COOKIE_CONFIG from './config/cookie';
import v1 from './v1/index';
import ErrorResponse from './libraries/exception/error-response';
import ERROR_CODE from './libraries/exception/error-code';
import corsOptions from './config/cors-options';
import log from './libraries/logger/winston';

dotenv.config();
morgan.format(
  'combined',
  ':method :url :status :res[content-length] - :response-time ms :remote-addr - :remote-user :referrer :user-agent',
);

const app = express();
const { SESSION_SECRET, COOKIE_SECRET, FRONTEND_SERVER_ADDRESS, NODE_ENV } = process.env;
const PAGE_NOT_FOUND_EXCEPTION = new ErrorResponse(ERROR_CODE.PAGE_NOT_FOUND);
const INTERNAL_SERVER_ERROR_EXCEPTION = new ErrorResponse(ERROR_CODE.INTERNAL_SERVER_ERROR);

if (NODE_ENV === 'production') {
  app.use(morgan('combined', { stream: log.debug }));
}
app.use(cors(corsOptions));
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

app.use(passport.initialize());
app.use(passport.session());

app.use(helmet());
app.set('trust proxy', 1);

app.use('/', v1);

app.use((req, res, next) => next(PAGE_NOT_FOUND_EXCEPTION));

app.use((err, req, res, next) => {
  if (err instanceof ErrorResponse) {
    const status = Number(err.errorCode.status);
    return res.status(status).json(err);
  }

  let who = '';
  if (req.user) {
    const copyUser = { ...req.user };
    delete copyUser.password;
    delete copyUser.salt;
    delete copyUser.imap_password;
    who = `${JSON.stringify(copyUser)}\n`;
  }
  log.error(who + err.stack);

  return res.status(500).json(INTERNAL_SERVER_ERROR_EXCEPTION);
});

export default app;
