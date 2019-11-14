import express from 'express';
import ctrl from './controller';
import passport from '../../middlewares/passport';

const router = express.Router();

router.post('/login', passport.authenticate('local'), ctrl.login);

module.exports = router;
