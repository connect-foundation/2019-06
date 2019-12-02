import { Router } from 'express';
import controller from './controller';

const router = Router();

router.get('/:no/attachments', controller.getAttachmentsByTemplateNo);

export default router;
