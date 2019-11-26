import STATUS from 'http-status';
import service from './service';
import ERROR_CODE from '../../../libraries/exception/error-code';
import ErrorResponse from '../../../libraries/exception/error-response';
import ErrorField from '../../../libraries/exception/error-field';

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
    const errorField = new ErrorField('boxName', name, '추가할 메일함 이름을 입력해주세요');
    return next(new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE, errorField));
  }

  if (name.length > MAILBOX_NAME_LENGTH_LIMIT) {
    const errorField = new ErrorField('boxName', name, '메일함 이름은 최대 20글자로 작성해주세요');
    return next(new ErrorResponse(ERROR_CODE.MAILBOX_EXCEED_NAME, errorField));
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
  const boxNo = Number(no);

  if (newName === BLANK || !newName) {
    const errorField = new ErrorField('newName', newName, '새로운 메일함 이름을 입력해주세요');
    return next(new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE, errorField));
  }

  if (oldName === BLANK || !oldName) {
    const errorField = new ErrorField('oldName', oldName, '메일함이 선택되지 않았습니다');
    return next(new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE, errorField));
  }

  if (no === '' || Number.isNaN(boxNo) || boxNo < 1) {
    const errorField = new ErrorField('mailBoxNo', no, '메일함이 잘못 전달되었습니다');
    return next(new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE, errorField));
  }

  if (newName.length > MAILBOX_NAME_LENGTH_LIMIT) {
    const errorField = new ErrorField('boxName', newName, '메일함은 최대 20글자로 작성해주세요');
    return next(new ErrorResponse(ERROR_CODE.MAILBOX_EXCEED_NAME, errorField));
  }

  let updatedBox;
  try {
    updatedBox = await service.updateBox(req.user, boxNo, oldName, newName);
  } catch (err) {
    return next(err);
  }
  res.status(STATUS.OK).json({ updatedBox });
};

const deleteMailBox = async (req, res, next) => {
  const { name, no } = req.query;
  const boxNo = Number(no);

  if (name === BLANK || !name) {
    const errorField = new ErrorField('boxName', name, '메일함이 잘못 전달되었습니다');
    return next(new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE, errorField));
  }

  if (no === '' || Number.isNaN(boxNo) || boxNo < 1) {
    const errorField = new ErrorField('boxNo', boxNo, '메일함이 잘못 전달되었습니다');
    return next(new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE, errorField));
  }

  let deletedBox;
  try {
    deletedBox = await service.deleteBox(req.user, boxNo, name);
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
