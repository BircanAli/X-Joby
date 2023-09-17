import { Router } from "express";
import { register, login, logout } from "../controllers/authorController.js";
import {
  validateRegisterUser,
  validateLoginUser,
} from "../middleware/validationMiddleware.js";

const router = Router();

router.post("/register", validateRegisterUser, register);
router.post("/login", validateLoginUser, login);
router.get("/logout", logout);

export default router;
