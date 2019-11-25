import DB from '../../../database';

const findAllBoxes = async userNo => {
  const result = await DB.Category.findAllByUserNo(userNo);
  return result;
};

const createBox = async (user_no, name) => {
  const [response] = await DB.Category.create({
    user_no,
    name,
  });
  return response.get({ plain: true });
};

const updateBox = async (user_no, name) => {
  const [response] = await DB.Category.update(
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
