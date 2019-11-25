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

const updateBox = async (user_no, name = BLANK) => {
  if (name === BLANK) {
    throw ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE);
  }
  const response = await DB.Category.update(
    {
      name,
    },
    {
      where: {
        user_no,
      },
    },
  );
  return response.get({ plain: true });
};

export default { findAllBoxes, createBox, updateBox };
