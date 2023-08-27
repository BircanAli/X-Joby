import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import jobRouter from "./routes/jobRouter.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 5100;

try {
  const response = await fetch(
    "https://www.course-api.com/react-useReducer-cart-project"
  );
  const carData = await response.json();
} catch (error) {
  console.log(error);
}

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

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

app.listen(port, () => console.log(`server started at port ${port}`));
