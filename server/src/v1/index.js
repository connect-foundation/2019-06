import { Router } from 'express';

import users from './users';
import mail from './mail/index';
import auth from './auth';
import admin from './admin';

import { isAuth, isAdmin, isWhitelistIp } from '../middlewares/auth';

const router = Router();

router.use('/users', users);
router.use('/auth', auth);
router.use('/mail', isAuth, mail);
router.use('/admin', isWhitelistIp, isAdmin, admin);

export default router;
