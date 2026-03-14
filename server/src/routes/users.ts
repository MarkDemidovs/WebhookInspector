import { Router } from "express";
import { register, login, logout } from "../controllers/users";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/", requireAuth);

export default router;