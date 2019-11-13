const HOUR = 1000 * 60 * 60;
const COOKIE_MAX_AGE = HOUR * 24;

const mode = process.env.NODE_ENV || 'development';

const cookieOptions = {
  maxAge: COOKIE_MAX_AGE,
  httpOnly: true,
  signed: true,
  secure: mode === 'production',
};

export default cookieOptions;
