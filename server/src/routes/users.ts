import { Router } from "express";
import { register } from "../controllers/users";

const router = Router();

router.get("/register", register);

export default router;