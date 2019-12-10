import { Router } from 'express';
import multer from 'multer';
import controller from './controller';
import mailBox from './box';
import mailTemplate from './template';
import attachment from './attachment';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

const { MAIL_FILE_MAX_COUNT } = process.env;

router.get('/', controller.list);
router.get('/categories', controller.getCategories);
router.patch('/:no', controller.update);
router.patch('/', controller.updateAll);
router.post('/', upload.array('attachments', MAIL_FILE_MAX_COUNT), controller.write);
router.delete('/:no', controller.remove);

router.use('/box', mailBox);
router.use('/template', mailTemplate);
router.use('/attachment', attachment);

export default router;
