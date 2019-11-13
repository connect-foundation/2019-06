import db from '../../database';
import validator from '../../utils/validator';
import ERROR_CODE from '../../libraries/error-code';
import ErrorResponse from '../../libraries/error-response';

const registerUser = async (req, res, next) => {
  try {
    const { name, id, password, email } = req.body;

    if (!validator.checkUser({ name, email, password, id })) {
      return next(new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE));
    }

    const [newUser, isCreated] = await db.User.checkIdAndCreate({ id, name, password, email });

    if (!isCreated) {
      return next(new ErrorResponse(ERROR_CODE.ID_DUPLICATION));
    }

    const user = newUser.get({ plain: true });

    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

export default { registerUser };
