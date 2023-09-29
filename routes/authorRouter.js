import { Router } from "express";
import { register, login, logout } from "../controllers/authorController.js";
import {
  validateRegisterUser,
  validateLoginUser,
} from "../middleware/validationMiddleware.js";
import rateLimit from "express-rate-limit";
//attempt  for login and register
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: { msg: "IP rate limit exceeded,retry in 15 minutes" },
});

const router = Router();

router.post("/register", apiLimiter, validateRegisterUser, register);
router.post("/login", apiLimiter, validateLoginUser, login);
router.get("/logout", logout);

export default router;
