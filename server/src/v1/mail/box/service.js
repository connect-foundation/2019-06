import DB from '../../../database';
import ERROR_CODE from '../../../libraries/exception/error-code';
import ErrorResponse from '../../../libraries/exception/error-response';

const findAllBoxes = async userNo => {
  const result = await DB.Category.findAllByUserNo(userNo);
  return result;
};

const createBox = async (user_no, name) => {
  const [response] = await DB.Category.create({
    user_no,
    name,
  });
  const newCategory = response.get({ plain: true });
  return newCategory;
};

export default { findAllBoxes, createBox };
