import service from './service';

const list = async (req, res, next) => {
  const { no, email } = req.user;

  let mails;
  try {
    mails = await service.getRawMails(no, email);
  } catch (error) {
    return next(error);
  }

  return res.json({ mails });
};

export default {
  list,
};
