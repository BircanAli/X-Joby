import { NotFoundError } from "../errors/customError.js";
import JobModels from "../models/JobModels.js";
import { StatusCodes } from "http-status-codes";

export const getAllJobs = async (req, res) => {
  const job = await JobModels.find({});
  res.status(StatusCodes.OK).json({ job });
};

export const createJob = async (req, res) => {
  const job = await JobModels.create(req.body);
  res.status(StatusCodes.CREATED).json(job);
};

export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await JobModels.findById(id);
  if (!job) throw new NotFoundError(`no job with that id ${id}`);
  res.status(StatusCodes.OK).json(job);
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const updatedJob = await JobModels.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedJob) throw new NotFoundError(`no job with id ${id}`);
  res.status(StatusCodes.OK).json({ msg: "job modified", job: updatedJob });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;

  const removedJob = await JobModels.findByIdAndDelete(id);

  if (!removedJob) throw new NotFoundError(`no job with id ${id}`);
  res
    .status(StatusCodes.OK)
    .json({ msg: "successfully deleted", job: removedJob });
};
