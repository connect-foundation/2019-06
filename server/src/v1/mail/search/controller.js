import service from './service';
import { checkSearchQuery } from '../../../libraries/validation/mail';

const list = async (req, res, next) => {
  const userNo = req.user.no;
  const { query } = req;
  let mails;

  try {
    checkSearchQuery(query);
    mails = await service.getMailsByOptions(userNo, query);
  } catch (error) {
    return next(error);
  }

  return res.json(mails);
};

export default {
  list,
};
