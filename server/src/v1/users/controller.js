import status from 'http-status';
import validation from '../../libraries/validation/user';
import service from './service';

const registerUser = async (req, res, next) => {
  let newUser;

  try {
    await validation.join(req.body);
    newUser = await service.register(req.body);
  } catch (error) {
    return next(error);
  }

  return res.status(status.CREATED).json({ newUser });
};

export default { registerUser };
