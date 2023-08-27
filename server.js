import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import { nanoid } from "nanoid";
dotenv.config();
const app = express();
const port = process.env.PORT || 5100;

let jobs = [
  { id: nanoid(), company: "apple", position: "front-end" },
  { id: nanoid(), company: "google", position: "back-end" },
];

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

//get all jobs

app.get("/api/v1/jobs", (req, res) => {
  res.status(200).json({ jobs });
});

//create job
app.post("/api/v1/jobs", (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(400).json({ msg: "please provide company and position" });
  }
  const id = nanoid(10);
  const job = { id, company, position };
  jobs.push(job);
  res.status(201).json(job);
});

//get single  job
app.get("/api/v1/jobs/:id", (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(200).json({ msg: `no job with id ${id}` });
  }
  res.status(200).json(job);
});

//edit job
app.patch("/api/v1/jobs/:id", (req, res) => {
  const { company, position, apple } = req.body;
  if (!company || !position) {
    return res.status(400).json({ msg: "please provide company and position" });
  }
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  job.company = company;
  job.position = position;
  job.apple = apple;
  res.status(200).json({ msg: "job modified", job });
});

// delete job

app.delete("/api/v1/jobs/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ msg: `there is not a job with that ${id}` });
  }

  const newJobs = jobs.filter((job) => job.id !== id);
  jobs = newJobs;
  res.status(200).json({ msg: "successfully deleted", jobs });
});

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.listen(port, () => console.log(`server started at port ${port}`));
