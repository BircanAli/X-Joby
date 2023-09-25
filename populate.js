import { readFile } from "fs/promises";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Job from "./models/JobModels.js";
import User from "./models/UserModels.js";

try {
  await mongoose.connect(process.env.MONGODB_URL);
  //   const user = await User.findOne({ email: "test@test.com" });
  //   const user = await User.findOne({ email: "birdzhan@gmail.com" });
  const jsonJobs = JSON.parse(
    await readFile(new URL("./utils/mockData.json", import.meta.url))
  );
  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user._id };
  });

  await Job.deleteMany({ createdBy: user._id });
  await Job.create(jobs);
  console.log("Success");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
