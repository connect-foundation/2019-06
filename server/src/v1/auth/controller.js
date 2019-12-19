import status from 'http-status';

const login = (req, res, next) => {
  if (res.locals.syncErr) {
    req.logout();
    return next(res.locals.syncErr);
  }
  const user = { ...req.user };

  delete user.password;
  delete user.salt;
  delete user.imap_password;

  res.json(user);
};

const logout = (req, res) => {
  req.logout();
  res.status(status.NO_CONTENT).end();
};

export default { login, logout };
