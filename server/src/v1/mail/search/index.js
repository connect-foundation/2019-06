import { Router } from 'express';
import controller from './controller';

const router = Router();

router.get('/advanced', controller.getAdvancedSearchResults);
router.get('/general', controller.getGeneralSearchResults);

export default router;
