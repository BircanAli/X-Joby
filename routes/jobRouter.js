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
} from "../controllers/jobController.js";

// router.get("/", getAllJobs); one way

router.route("/").get(getAllJobs).post(validateJobInput, createJob);
router
  .route("/:id")
  .get(validateJobParam, getJob)
  .patch(validateJobInput, validateJobParam, updateJob)
  .delete(validateJobParam, deleteJob);

export default router;
