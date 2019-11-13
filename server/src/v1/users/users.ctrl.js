import bcrypt from 'bcrypt';

import db from '../../database';
import validator from '../../utils/validator';

const registerUser = async (req, res, next) => {
  try {
    const { name, id, password, email } = req.body;

    if (!validator.checkUser({ name, email, password, id })) {
      return res.status(422).end(); // 요청은 잘 만들어졌지만, 문법 오류로 인하여 따를 수 없습니다.
    }

    const { DEFAULT_DOMAIN_NO, DEFAULT_DOMAIN_NAME } = process.env;
    const userEmail = id + DEFAULT_DOMAIN_NAME;
    const round = parseInt(process.env.SALT_ROUND, 10);
    const salt = await bcrypt.genSalt(round);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [newUser, isCreated] = await db.User.findOrCreate({
      where: { email: userEmail },
      defaults: {
        domain_no: DEFAULT_DOMAIN_NO,
        user_id: id,
        name,
        password: hashedPassword,
        mail: userEmail,
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
