import { Router } from "express";
import { getEndpoints, createEndpoint } from "../controllers/endpoints";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/", requireAuth, getEndpoints);
router.post("/", requireAuth, createEndpoint);

export default router;