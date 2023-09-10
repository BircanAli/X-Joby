import { Router } from "express";
import { register, login } from "../controllers/authorController.js";
import {
  validateRegisterUser,
  validateLoginUser,
} from "../middleware/validationMiddleware.js";

const router = Router();

router.post("/register", validateRegisterUser, register);
router.post("/login", validateLoginUser, login);

export default router;
