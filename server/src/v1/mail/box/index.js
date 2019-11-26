import { Router } from 'express';
import ctrl from './controller';

const router = Router();

router.get('/', ctrl.getMailBoxes);
router.post('/', ctrl.makeMailBox);
router.patch('/', ctrl.alterMailBox);
router.delete('/', ctrl.deleteMailBox);

export default router;
