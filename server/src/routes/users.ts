import { Router } from "express";
import { register, getUsers, login } from "../controllers/users";
import { requireAuth } from "../middleware/auth";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", requireAuth, getUsers);

export default router;