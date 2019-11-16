const login = (req, res) => {
  res.json(req.user);
};

export default { login };
