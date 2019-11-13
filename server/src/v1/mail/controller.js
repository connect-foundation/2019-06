import service from './service';

const list = async (req, res, next) => {
  const { no, email } = req.user;

  let mail;
  try {
    mail = await service.rawMailList(no, email);
  } catch (error) {
    return next(error);
  }

  return res.json({ mail });
};

export default {
  list,
};
