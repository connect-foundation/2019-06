import service from './service';
import { checkAdvancedSearchQuery } from '../../../libraries/validation/mail';

const advanced = async (req, res, next) => {
  const userNo = req.user.no;
  const { query } = req;
  let mails;
  try {
    checkAdvancedSearchQuery(query);
    mails = await service.getMailsByOptions(userNo, query);
  } catch (error) {
    return next(error);
  }

  return res.json(mails);
};

export default {
  advanced,
};
