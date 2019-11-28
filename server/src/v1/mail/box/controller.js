import STATUS from 'http-status';
import service from './service';
import validation from '../../../libraries/validation/mailbox';

const getMailBoxes = async (req, res, next) => {
  let boxes;
  try {
    boxes = await service.findAllBoxes(req.user.no);
  } catch (err) {
    return next(err);
  }
  res.status(STATUS.OK).json({ boxes });
};

const makeMailBox = async (req, res, next) => {
  const { name } = req.body;
  let createdBox;

  try {
    validation.makeMailBoxValidation(name);
    createdBox = await service.createBox(req.user, name);
  } catch (err) {
    return next(err);
  }
  res.status(STATUS.CREATED).json({ createdBox });
};

const alterMailBox = async (req, res, next) => {
  const { oldName, newName, no } = req.body;
  const boxNo = Number(no);
  let updatedBox;

  try {
    validation.updateMailBoxValidation(newName, oldName, no);
    updatedBox = await service.updateBox(req.user, boxNo, oldName, newName);
  } catch (err) {
    return next(err);
  }
  res.status(STATUS.OK).json({ updatedBox });
};

const deleteMailBox = async (req, res, next) => {
  const { name, no } = req.query;
  const boxNo = Number(no);
  let deletedBox;

  try {
    validation.deleteMailBoxValidation(name, no);
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
