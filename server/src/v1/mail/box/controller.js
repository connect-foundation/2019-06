import STATUS from 'http-status';
import service from './service';

const getMailBox = async (req, res, next) => {
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
  let createdBox;
  try {
    createdBox = await service.createBox(req.user, name);
  } catch (err) {
    return next(err);
  }
  res.status(STATUS.CREATED).json({ createdBox });
};

const alterMailBox = async (req, res, next) => {
  const { name, no } = req.body;
  let updatedBox;
  try {
    updatedBox = await service.updateBox(req.user, no, name);
  } catch (err) {
    return next(err);
  }
  res.status(STATUS.OK).json({ updatedBox });
};

const delMailBox = async (req, res, next) => {
  const { name, no } = req.query;
  let deletedBox;
  try {
    deletedBox = await service.deleteBox(req.user, no, name);
  } catch (err) {
    return next(err);
  }
  res.status(STATUS.OK).json({ deletedBox });
};

export default {
  getMailBox,
  makeMailBox,
  alterMailBox,
  delMailBox,
};
