import { Router } from 'express';

import users from './users';
import mail from './mail/index';
import auth from './auth';

const router = Router();

router.get('/', (req, res) => res.json({ msg: '하하' }));
router.use('/users', users);
router.use('/mail', mail);
router.use('/auth', auth);

export default router;
