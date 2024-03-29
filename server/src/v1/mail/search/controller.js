import service from './service';
import {
  checkAdvancedSearchQuery,
  checkGeneralSearchQuery,
} from '../../../libraries/validation/mail';

const getAdvancedSearchResults = async (req, res, next) => {
  const { query } = req;
  let mails;

  try {
    checkAdvancedSearchQuery(query);
    mails = await service.getAdvancedSearchResults(req.user, query);
  } catch (error) {
    return next(error);
  }

  return res.json(mails);
};

const getGeneralSearchResults = async (req, res, next) => {
  const { query } = req;
  let mails;

  try {
    checkGeneralSearchQuery(query);
    mails = await service.getGeneralSearchResults(req.user, query);
  } catch (error) {
    return next(error);
  }

  return res.json(mails);
};

export default {
  getAdvancedSearchResults,
  getGeneralSearchResults,
};
