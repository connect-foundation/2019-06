import { Router } from 'express';
import controller from './controller';

const router = Router();

router.get('/:no/download', controller.downloadAttachment);

export default router;
