import { Router } from 'express';

import users from './users';
import mail from './mail/index';
import auth from './auth';
import admin from './admin';

import { isAuth, isAdmin } from '../middlewares/auth';
import syncWithImap from '../middlewares/sync-with-imap';

const router = Router();

router.use('/users', users);
router.use('/auth', auth);
router.use('/mail', isAuth, mail);
router.use('/admin', isAdmin, admin);
router.get('/', syncWithImap);

export default router;
