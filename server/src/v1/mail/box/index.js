import { Router } from 'express';
import ctrl from './controller';

const router = Router();

router.get('/', ctrl.getMailBox);
router.post('/', ctrl.makeMailBox);
router.patch('/', ctrl.alterMailBox);
router.delete('/', ctrl.delMailBox);

export default router;
