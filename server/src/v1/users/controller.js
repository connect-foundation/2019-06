import db from '../../database';
import ErrorResponse from '../../libraries/error-response';
import { parseValidationError } from '../../libraries/parse-sequelize-error';

const registerUser = async (req, res, next) => {
  const { id, name, password, email } = req.body;

  let newUser;

  try {
    newUser = await db.User.build({ user_id: id, name, password, sub_email: email });
    await newUser.validate();
    await newUser.save();
  } catch (error) {
    const parsedError = parseValidationError(error);
    return next(new ErrorResponse(parsedError));
  }

  const user = newUser.get({ plain: true });
  delete user.password;
  res.status(201).json({ user });
};

export default { registerUser };
