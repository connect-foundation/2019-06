import { Router } from 'express';
import mail from './mail/index';
import { isAuth } from '../middlewares/auth';

const router = Router();

router.use('/mail', isAuth, mail);

export default router;
