import { Router } from "express";
import { register, login } from "../controllers/authorController.js";
import { validateUser } from "../middleware/validationMiddleware.js";

const router = Router();

router.post("/register",validateUser, register);
router.post("/login", login);

export default router;
