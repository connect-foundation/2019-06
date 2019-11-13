import db from '../../database';
import validator from '../../utils/validator';

const registerUser = async (req, res, next) => {
  try {
    const { name, id, password, email } = req.body;

    if (!validator.checkUser({ name, email, password, id })) {
      return res.status(422).end(); // 요청은 잘 만들어졌지만, 문법 오류로 인하여 따를 수 없습니다.
    }

    const [newUser, isCreated] = await db.User.findOrCreate({
      where: { user_id: id },
      defaults: {
        user_id: id,
        name,
        password,
        sub_email: email,
      },
    });

    if (!isCreated) {
      return res.status(409).end();
    }

    const user = newUser.get({ plain: true });

    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

export default { registerUser };
