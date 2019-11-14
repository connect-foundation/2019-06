import db from '../../database';
import { checkUser } from '../../libraries/validator';
import ERROR_CODE from '../../libraries/error-code';
import ErrorResponse from '../../libraries/error-response';

const registerUser = async (req, res, next) => {
  const { id, name, password, email } = req.body;

  let newUser, isCreated;
  try {
    [newUser, isCreated] = await db.User.checkIdAndCreate({ id, name, password, email });
  } catch (error) {
    return next(new ErrorResponse(ERROR_CODE.EMAIL_DUPLICATION));
  }

  if (!isCreated) {
    return next(new ErrorResponse(ERROR_CODE.ID_DUPLICATION));
  }
  const user = newUser.get({ plain: true });
  delete user.password;
  res.status(201).json({ user });
};

export default { registerUser };
