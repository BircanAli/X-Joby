import { Router } from "express";
import {
  validateJobInput,
  validateJobParam,
} from "../middleware/validationMiddleware.js";
const router = Router();
import {
  getAllJobs,
  getJob,
  createJob,
  deleteJob,
  updateJob,
  showStats,
} from "../controllers/jobController.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

// router.get("/", getAllJobs); one way

router
  .route("/")
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob);

router.route("/stats").get(showStats);

router
  .route("/:id")
  .get(validateJobParam, getJob)
  .patch(checkForTestUser, validateJobInput, validateJobParam, updateJob)
  .delete(checkForTestUser, validateJobParam, deleteJob);

export default router;
