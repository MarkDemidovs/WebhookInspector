import { Router } from 'express';
import { captureRequest } from '../controllers/hooks';

const router = Router();

router.all("/:slug", captureRequest);

export default router;