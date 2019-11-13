import { Router } from 'express';
import users from './users';

const router = Router();

router.get('/', (req, res) => res.json({ msg: '하하' }));
router.use('/users', users);

export default router;
