import JobModels from "../models/JobModels.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import day from "dayjs";

export const getAllJobs = async (req, res) => {
  const jobs = await JobModels.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ jobs });
};

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
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

export const showStats = async (req, res) => {
  // const jobs = await JobModels.find({ createdBy: req.user.userId });
  // const defaultStats = {
  //   pending: jobs.filter((job) => {
  //     if (job.jobStatus === "pending") return true;
  //   }),
  //   interview: jobs.filter((job) => {
  //     if (job.jobStatus === "interview") return true;
  //   }),
  //   declined: jobs.filter((job) => {
  //     if (job.jobStatus === "declined") return true;
  //   }),
  // };

  let stats = await JobModels.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr; // pending , 43
    acc[title] = count; // {pending: 43}

    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await JobModels.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");
      return { date, count };
    })
    .reverse();
  res.status(StatusCodes.OK).send({ defaultStats, monthlyApplications });
};
