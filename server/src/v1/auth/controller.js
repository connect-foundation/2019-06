import status from 'http-status';

const login = (req, res) => {
  res.json(req.user);
};

const logout = (req, res) => {
  req.logout();
  res.status(status.NO_CONTENT).end();
};

export default { login, logout };
