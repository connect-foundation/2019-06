import { Router } from 'express';
import ctrl from './controller';

const router = Router();

router
  .route('/')
  .get(ctrl.getMailBoxes)
  .post(ctrl.makeMailBox)
  .patch(ctrl.alterMailBox)
  .delete(ctrl.deleteMailBox);

export default router;
