import DB from '../../../database';
import { addMailBox, renameMailBox, deleteMailBox } from '../../../libraries/save-to-infra';
import ERROR_CODE from '../../../libraries/exception/error-code';
import ErrorResponse from '../../../libraries/exception/error-response';

const BLANK = '';

const findAllBoxes = async userNo => {
  const result = await DB.Category.findAllByUserNo(userNo);
  return result;
};

const createBox = async (user, name = BLANK) => {
  const response = await DB.Category.create({
    user_no: user.no,
    name,
  });
  addMailBox({ user, name });
  return response.get({ plain: true });
};

const updateBox = async (user, boxNo, oldName, newName) => {
  const boxRow = await DB.Category.findOneByCategoryNoAndUserNoAndName(boxNo, user.no, oldName);
  if (!boxRow.no) {
    throw ErrorResponse(ERROR_CODE.MAILBOX_NOT_FOUND);
  }

  await DB.Category.update(
    {
      name: newName,
    },
    {
      where: {
        no: boxNo,
        user_no: user.no,
      },
    },
  );
  renameMailBox({ user, oldName: boxRow.dataValues.name, newName });

  return boxRow;
};

const deleteBox = async (user, boxNo, boxName) => {
  const boxRow = await DB.Category.findOneByCategoryNoAndUserNoAndName(boxNo, user.no, boxName);
  if (!boxRow.no) {
    throw ErrorResponse(ERROR_CODE.MAILBOX_NOT_FOUND);
  }

  await DB.Category.destroy({ where: { no: boxNo } });
  deleteMailBox({ user, name: boxName });
  return boxRow.dataValues;
};

export default { findAllBoxes, createBox, updateBox, deleteBox };
