import { Router } from 'express';
import controller from './controller';

const router = Router();

router.get('/advanced', controller.advanced);
router.get('/general', controller.general);

export default router;
