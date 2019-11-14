import { Router } from 'express';
import ctrl from './controller';

import { validateUser } from '../../middlewares/validate-user';

const router = Router();

router.get('/', (req, res) => {
  res.json({});
});

router.post('/', validateUser, ctrl.registerUser);

export default router;
