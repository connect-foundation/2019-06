import DB from '../../../database';
import ERROR_CODE from '../../../libraries/exception/error-code';
import ErrorResponse from '../../../libraries/exception/error-response';

const BLANK = '';

const findAllBoxes = async userNo => {
  const result = await DB.Category.findAllByUserNo(userNo);
  return result;
};

const createBox = async (user_no, name = BLANK) => {
  if (name === BLANK) {
    throw ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE);
  }
  const response = await DB.Category.create({
    user_no,
    name,
  });
  return response.get({ plain: true });
};

const updateBox = async (user_no, no, name = BLANK) => {
  if (name === BLANK) {
    throw ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE);
  }
  return await DB.sequelize.transaction(
    async transaction => await updateBoxName(name, no, user_no, transaction),
  );
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
