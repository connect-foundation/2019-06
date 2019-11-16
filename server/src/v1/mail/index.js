import { Router } from 'express';
import multer from 'multer';
import controller from './controller';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', controller.list);
router.post('/', upload.array('attachments', 5), controller.write);

export default router;
