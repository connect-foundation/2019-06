import { Router } from 'express';
import multer from 'multer';
import controller from './controller';
import mailBox from './box';
import mailTemplate from './template';
import attachment from './attachment';
import search from './search';
import { MAIL_FILE_MAX_COUNT } from '../../constant/mail';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', controller.list);
router.get('/categories', controller.getCategories);
router.patch('/', controller.update);
router.post('/', upload.array('attachments', MAIL_FILE_MAX_COUNT), controller.write);
router.delete('/', controller.remove);

router.use('/box', mailBox);
router.use('/template', mailTemplate);
router.use('/attachment', attachment);
router.use('/search', search);

export default router;
