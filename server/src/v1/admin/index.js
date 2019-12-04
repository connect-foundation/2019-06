import { Router } from 'express';

import mail from './mail';

const router = Router();

router.use('/mail', mail);

export default router;
