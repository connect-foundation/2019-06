import status from 'http-status';
import ERROR_CODE from '../../../libraries/exception/error-code';
import ErrorResponse from '../../../libraries/exception/error-response';
import service from './service';

const getMailBox = async (req, res, next) => {
  const { no } = req.user;
  let boxes;
  try {
    boxes = await service.findAllBoxes(no);
  } catch (err) {
    next(err);
  }
  res.status(status.OK).json({ boxes });
};

const makeMailBox = (req, res) => {};

const alterMailBox = (req, res) => {};

export default {
  getMailBox,
  makeMailBox,
  alterMailBox,
};
