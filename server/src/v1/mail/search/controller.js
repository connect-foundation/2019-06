import service from './service';
import {
  checkAdvancedSearchQuery,
  checkGeneralSearchQuery,
} from '../../../libraries/validation/mail';

const getAdvancedSearchResults = async (req, res, next) => {
  const userNo = req.user.no;
  const { query } = req;
  let mails;

  try {
    checkAdvancedSearchQuery(query);
    mails = await service.getAdvancedSearchResults(userNo, query);
  } catch (error) {
    return next(error);
  }

  return res.json(mails);
};

const getGeneralSearchResults = async (req, res, next) => {
  const userNo = req.user.no;
  const { query } = req;
  let mails;

  try {
    checkGeneralSearchQuery(query);
    mails = await service.getGeneralSearchResults(userNo, query);
  } catch (error) {
    return next(error);
  }

  return res.json(mails);
};

export default {
  getAdvancedSearchResults,
  getGeneralSearchResults,
};
