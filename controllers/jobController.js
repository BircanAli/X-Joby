import JobModels from "../models/JobModels.js";
import { StatusCodes } from "http-status-codes";

export const getAllJobs = async (req, res) => {
  console.log(req.user);
  const job = await JobModels.find({});
  res.status(StatusCodes.OK).json({ job });
};

export const createJob = async (req, res) => {
  const job = await JobModels.create(req.body);
  res.status(StatusCodes.CREATED).json(job);
};

export const getJob = async (req, res) => {
  const job = await JobModels.findById(req.params.id);
  res.status(StatusCodes.OK).json(job);
};

export const updateJob = async (req, res) => {
  const updatedJob = await JobModels.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(StatusCodes.OK).json({ msg: "job modified", job: updatedJob });
};

export const deleteJob = async (req, res) => {
  const removedJob = await JobModels.findByIdAndDelete(req.params.id);
  res
    .status(StatusCodes.OK)
    .json({ msg: "successfully deleted", job: removedJob });
};
