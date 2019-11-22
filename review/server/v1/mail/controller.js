import service from './service';
import checkQuery from '../../libraries/validation/mail';

const list = async (req, res, next) => {
  const userNo = req.user.no;
  const { query } = req;

  let mails;
  try {
    checkQuery(query);
    mails = await service.getMailsByOptions(userNo, query);
  } catch (error) {
    return next(error);
  }

  return res.json({ mails });
};


export default {
  list,
};
