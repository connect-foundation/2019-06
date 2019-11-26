import status from 'http-status';

const login = (req, res) => {
  const user = { ...req.user };

  delete user.password;
  delete user.salt;

  res.json(user);
};

const logout = (req, res) => {
  req.logout();
  res.status(status.NO_CONTENT).end();
};

export default { login, logout };
