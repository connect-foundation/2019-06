import STATUS from 'http-status';
import service from './service';
import ERROR_CODE from '../../../libraries/exception/error-code';
import ErrorResponse from '../../../libraries/exception/error-response';

const BLANK = '';
const { MAILBOX_NAME_LENGTH_LIMIT } = process.env;

const getMailBoxes = async (req, res, next) => {
  let boxes;
  try {
    boxes = await service.findAllBoxes(req.user);
  } catch (err) {
    return next(err);
  }
  res.status(STATUS.OK).json({ boxes });
};

const makeMailBox = async (req, res, next) => {
  const { name } = req.body;
  if (name === BLANK || !name) {
    return next(new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE));
  }

  if (name.length > MAILBOX_NAME_LENGTH_LIMIT) {
    return next(new ErrorResponse(ERROR_CODE.MAILBOX_EXCEED_NAME));
  }

  let createdBox;
  try {
    createdBox = await service.createBox(req.user, name);
  } catch (err) {
    return next(err);
  }
  res.status(STATUS.CREATED).json({ createdBox });
};

const alterMailBox = async (req, res, next) => {
  const { oldName, newName, no } = req.body;
  if (newName === BLANK || oldName === BLANK || !oldName || !newName) {
    return next(new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE));
  }

  if (newName.length > MAILBOX_NAME_LENGTH_LIMIT) {
    return next(new ErrorResponse(ERROR_CODE.MAILBOX_EXCEED_NAME));
  }

  let updatedBox;
  try {
    updatedBox = await service.updateBox(req.user, no, oldName, newName);
  } catch (err) {
    return next(err);
  }
  res.status(STATUS.OK).json({ updatedBox });
};

const deleteMailBox = async (req, res, next) => {
  const { name, no } = req.query;
  if (name === BLANK || !name) {
    return next(new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE));
  }

  let deletedBox;
  try {
    deletedBox = await service.deleteBox(req.user, no, name);
  } catch (err) {
    return next(err);
  }
  res.status(STATUS.OK).json({ deletedBox });
};

export default {
  getMailBoxes,
  makeMailBox,
  alterMailBox,
  deleteMailBox,
};
