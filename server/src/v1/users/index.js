import { Router } from 'express';
import ctrl from './controller';
import { isAuth } from '../../middlewares/auth';

const router = Router();

router.get('/', (req, res) => {
  res.json({});
});

router.post('/', ctrl.registerUser);
router.delete('/', isAuth, ctrl.removeUser);
router.post('/search', ctrl.search);
router.patch('/password', isAuth, ctrl.updatePassword);

export default router;
