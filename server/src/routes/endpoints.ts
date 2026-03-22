import { Router } from "express";
import { getEndpoints, createEndpoint, deleteEndpoint, getRequests, deleteRequests, getEndpoint } from "../controllers/endpoints";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/", requireAuth, getEndpoints);
router.get("/:id", requireAuth, getEndpoint);
router.post("/", requireAuth, createEndpoint);
router.delete("/:id", requireAuth, deleteEndpoint);
router.get("/:id/requests", requireAuth, getRequests);
router.delete("/:id/requests", requireAuth, deleteRequests);

export default router;