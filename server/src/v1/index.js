import { Router } from 'express';

import users from './users';
import mail from './mail/index';
import auth from './auth';
import admin from './admin';
import { getImapMessageIds } from '../libraries/save-to-infra';

import { isAuth, isAdmin } from '../middlewares/auth';

const router = Router();

router.use('/users', users);
router.use('/auth', auth);
router.use('/mail', isAuth, mail);
router.use('/admin', isAdmin, admin);
router.get('/', async (req, res, next) => {
  console.log('ha wi');
  const messageIds = await getImapMessageIds({
    user: { email: 'yaahoo@daitnu.com', password: '12345678' },
  });
  res.send(messageIds);
});

export default router;
