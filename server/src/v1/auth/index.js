import express from 'express';
import ctrl from './controller';
import passport from '../../middlewares/passport';

import { validateLogin } from '../../middlewares/validate-login';

const router = express.Router();

router.post('/login', validateLogin, passport.authenticate('local'), ctrl.login);

module.exports = router;
