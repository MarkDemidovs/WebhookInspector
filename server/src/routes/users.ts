import { Router } from "express";
import { register, getUsers } from "../controllers/users";
import { requireAuth } from "../middleware/auth";
const router = Router();

router.post("/register", register);
router.get("/api", requireAuth, getUsers);

export default router;