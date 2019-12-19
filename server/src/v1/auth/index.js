import express from 'express';
import ctrl from './controller';
import passport from '../../middlewares/passport';

import { validateLogin } from '../../middlewares/validate-login';
import syncWithImap from '../../middlewares/sync-with-imap';

const router = express.Router();

router.post('/login', validateLogin, passport.authenticate('local'), syncWithImap, ctrl.login);
router.post('/logout', ctrl.logout);

module.exports = router;
