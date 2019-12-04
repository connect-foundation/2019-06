import { Router } from 'express';
import controller from './controller';

const router = Router();

router.post('/', controller.sendReservationMails);

export default router;
