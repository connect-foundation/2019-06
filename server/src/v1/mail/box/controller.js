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

const makeMailBox = async (req, res, next) => {
  const { no } = req.user;
  const { name } = req.body;
  let createdBox;
  try {
    createdBox = await service.createBox(no, name);
  } catch (err) {
    next(err);
  }
  res.status(status.CREATED).json({ createdBox });
};

const alterMailBox = (req, res) => {};

export default {
  getMailBox,
  makeMailBox,
  alterMailBox,
};
