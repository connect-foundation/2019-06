import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import v1 from './v1/index';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.set('trust proxy', 1);
app.use('/v1', v1);

app.use((req, res, next) => {
  const error = new Error('404 PAGE NOT FOUND');
  error.status = 404;
  return next(error);
});

app.use((err, req, res) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(status).json({ message });
});

export default app;
