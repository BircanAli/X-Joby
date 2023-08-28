import JobModels from "../models/JobModels.js";

export const getAllJobs = async (req, res) => {
  const job = await JobModels.find({});
  res.status(200).json({ job });
};

export const createJob = async (req, res) => {
  const job = await JobModels.create(req.body);
  res.status(201).json(job);
};

export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await JobModels.findById(id);
  if (!job) {
    return res.status(404).json({ msg: `there is no job with that ${id}` });
  }
  res.status(200).json(job);
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const updatedJob = await JobModels.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedJob) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  res.status(200).json({ msg: "job modified", job: updatedJob });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;

  const removedJob = await JobModels.findByIdAndDelete(id);

  if (!removedJob) {
    return res.status(400).json({ msg: `there is not a job with that ${id}` });
  }
  res.status(200).json({ msg: "successfully deleted", job: removedJob });
};
