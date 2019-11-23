import { Router } from 'express';
import ctrl from './controller';

const router = Router();

router.get('/', (req, res) => {
  res.json({});
});

router.post('/', ctrl.registerUser);
router.post('/search', ctrl.search);

export default router;
