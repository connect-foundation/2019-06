import { Router } from 'express';
import ctrl from './users.ctrl';

const router = Router();

router.get('/', (req, res) => {
  res.json({});
});
router.post('/', ctrl.registerUser);

export default router;
