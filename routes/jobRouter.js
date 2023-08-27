import { Router } from "express";
const router = Router();

import {
  getAllJobs,
  getJob,
  createJob,
  deleteJob,
  updateJob,
} from "../controllers/jobController.js";

// router.get("/", getAllJobs); one way

router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getJob).patch(updateJob).delete(deleteJob);

export default router;
