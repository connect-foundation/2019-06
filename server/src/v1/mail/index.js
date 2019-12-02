import { Router } from 'express';
import multer from 'multer';
import controller from './controller';
import mailBox from './box';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

const { MAIL_FILE_MAX_COUNT } = process.env;

router.get('/', controller.list);
router.get('/categories', controller.getCategories);
router.patch('/:no', controller.update);
router.post('/', upload.array('attachments', MAIL_FILE_MAX_COUNT), controller.write);

router.use('/box', mailBox);

export default router;
