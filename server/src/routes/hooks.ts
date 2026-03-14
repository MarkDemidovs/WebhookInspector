import { Router } from 'express';
import { captureRequest } from '../controllers/hooks';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.all("/:slug", captureRequest);

export default router;