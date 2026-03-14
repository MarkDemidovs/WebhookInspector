import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { shareRequests, getSharedRequests } from '../controllers/requests';
const router = Router();

router.post("/:id/share", requireAuth, shareRequests);
router.get("/share/:token", getSharedRequests)

export default router;