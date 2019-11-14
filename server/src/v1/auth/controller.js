const login = (req, res) => {
  const { id, name, email, no } = req.user;

  req.session.id = id;
  req.session.name = name;
  req.session.email = email;
  req.session.no = no;

  res.json(req.user);
};

export default { login };
