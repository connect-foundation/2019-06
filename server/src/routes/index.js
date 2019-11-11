import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => res.json({ msg: '하하' }));

export default router;
