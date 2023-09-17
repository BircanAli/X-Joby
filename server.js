import "express-async-errors";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authorRouter.js";
import userRouter from "./routes/userRouter.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5100;

app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("server started");
});
app.use("/api/v1/test",(req,res)=>{
  res.json({msg:"test route"})
})

app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.use(errorHandlerMiddleware);

try {
  await mongoose.connect(process.env.MONGODB_URL);
  app.listen(port, () =>
    console.log(`server started at port http://localhost:${port}/`)
  );
} catch (error) {
  console.log(error);
  process.exit(1);
}
