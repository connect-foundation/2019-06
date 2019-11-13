import { Router } from 'express';

import users from './users';
import mail from './mail/index';

const router = Router();

router.get('/', (req, res) => res.json({ msg: '하하' }));
router.use('/users', users);
router.use('/mail', mail);

export default router;
