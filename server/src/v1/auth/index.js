import express from 'express';
import ctrl from './controller';
import passport from '../../middlewares/passport';

import { validateLogin } from '../../middlewares/validate-login';
import syncWithImap from '../../middlewares/sync-with-imap';

const router = express.Router();

const { NODE_ENV } = process.env;

if (NODE_ENV === 'test') {
  router.post('/login', validateLogin, passport.authenticate('local'), ctrl.login);
} else {
  router.post('/login', validateLogin, passport.authenticate('local'), syncWithImap, ctrl.login);
}

router.post('/logout', ctrl.logout);

module.exports = router;
