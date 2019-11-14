import express from 'express';
import ctrl from './controller';
import passport from '../../middlewares/passport';

import { checkLoginForm } from '../../middlewares/check-login-form';

const router = express.Router();

router.post('/login', checkLoginForm, passport.authenticate('local'), ctrl.login);

module.exports = router;
