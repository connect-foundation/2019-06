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
  if (name === BLANK) {
    throw ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE);
  }
  const response = await DB.Category.create({
    user_no: user.no,
    name,
  });
  addMailBox({ user, name });
  return response.get({ plain: true });
};

const updateBox = async (user, no, newName = BLANK) => {
  if (newName === BLANK) {
    throw ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE);
  }
  const { dataValues } = await DB.Category.findByPk(no);
  const result = await DB.sequelize.transaction(
    async transaction => await updateBoxName(name, no, user.no, transaction),
  );
  renameMailBox({ user, oldName: dataValues.name, newName });
  return result;
};

const updateBoxName = async (name, no, user_no, transaction) => {
  await DB.Category.update(
    {
      name,
    },
    {
      where: {
        no,
        user_no,
      },
    },
    { transaction },
  );
  const { dataValues } = await DB.Category.findByPk(no, { transaction });
  return dataValues;
};

export default { findAllBoxes, createBox, updateBox };
