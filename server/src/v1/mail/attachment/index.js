import { Router } from 'express';
import controller from './controller';

const router = Router();

router.get('/:no/download', controller.downloadAttachment);
router.get('/:no/preview', controller.previewAttachment);

export default router;
