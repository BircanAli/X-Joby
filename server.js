import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import jobRouter from "./routes/jobRouter.js";
import mongoose from "mongoose";
dotenv.config();
const app = express();
const port = process.env.PORT || 5100;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("server started");
});

app.post("/", (req, res) => {
  res.json({ message: "data received", data: req.body });
});

app.use("/api/v1/jobs", jobRouter);

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: "there is error" });
});

try {
  await mongoose.connect(process.env.MONGODB_URL);
  app.listen(port, () => console.log(`server started at port ${port}`));
} catch (error) {
  console.log(error);
  process.exit(1);
}

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
