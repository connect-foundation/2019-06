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

const search = async (req, res, next) => {
  const { type } = req.query;
  const { id, email } = req.body;

  try {
    validation.checkQueryForSearch(req.query);
    if (type === 'id') {
      validation.checkBodyForIdSearch(req.body);
      await service.sendUserIdToEmail(email);
    } else if (type === 'pw') {
      validation.checkBodyForPasswordSearch(req.body);
      await service.sendUserPasswordToEmail(id, email);
    }
  } catch (err) {
    return next(err);
  }

  return res.status(status.NO_CONTENT).end();
};

const updatePassword = async (req, res, next) => {
  const { no, salt } = req.user;
  try {
    validation.checkBodyForPasswordUpdate(req.body);
    await service.updatePassword(no, salt, req.body.password);
  } catch (err) {
    return next(err);
  }

  return res.status(status.NO_CONTENT).end();
};

export default { registerUser, updatePassword, search };
