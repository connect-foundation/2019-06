import DB from '../../../database';
import { addMailBox, renameMailBox, deleteMailBox } from '../../../libraries/save-to-infra';
import ERROR_CODE from '../../../libraries/exception/error-code';
import ErrorResponse from '../../../libraries/exception/error-response';

const findAllBoxes = async userNo => {
  const result = await DB.Category.findAllByUserNo(userNo);
  return result;
};

const createBox = async (user, name) => {
  const response = await DB.Category.create({
    user_no: user.no,
    name,
  });
  addMailBox({ user, name });
  return response.get({ plain: true });
};

const updateBox = async (user, boxNo, oldName, newName) => {
  const boxRow = await DB.Category.findOneByCategoryNoAndUserNoAndName(boxNo, user.no, oldName);
  if (!boxRow) {
    throw new ErrorResponse(ERROR_CODE.MAILBOX_NOT_FOUND);
  }

  boxRow.name = newName;
  await boxRow.save();
  renameMailBox({ user, oldName: boxRow.dataValues.name, newName });

  return boxRow;
};

const deleteBox = async (user, boxNo, boxName) => {
  const boxRow = await DB.Category.findOneByCategoryNoAndUserNoAndName(boxNo, user.no, boxName);
  if (!boxRow) {
    throw new ErrorResponse(ERROR_CODE.MAILBOX_NOT_FOUND);
  }

  await DB.Category.destroy({ where: { no: boxNo } });
  deleteMailBox({ user, name: boxName });
  return boxRow.dataValues;
};

export default { findAllBoxes, createBox, updateBox, deleteBox };
