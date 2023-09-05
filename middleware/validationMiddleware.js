import { body, param, validationResult } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/customError.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import mongoose from "mongoose";
import Job from "../models/JobModels.js";
import User from "../models/UserModels.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("no job")) {
          throw new NotFoundError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body("company").notEmpty().withMessage("company is required"),
  body("position").notEmpty().withMessage("position is required"),
  body("jobLocation").notEmpty().withMessage("location is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("invalid status value"),
  body("jobType").isIn(Object.values(JOB_TYPE)).withMessage("invalid job type"),
]);

export const validateJobParam = withValidationErrors([
  param("id").custom(async (value) => {
    const isValid = mongoose.Types.ObjectId.isValid(value);
    if (!isValid) throw BadRequestError("invalid MongoDB id");

    const job = await Job.findById(value);
    if (!job) throw new NotFoundError(`no job with id ${value}`);
  }),
]);

export const validateUser = withValidationErrors([
  body("name").notEmpty().withMessage("user name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    // .custom((value) => {
    //   return String(value)
    //     .toLowerCase()
    //     .match(
    //       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //     );
    // })
    .withMessage("please provide valid email")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("email already exists");
      }
    }),

  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ ming: 8 })
    .withMessage("minimum 8 character"),
  body("lastName").notEmpty().withMessage("last name required"),
  body("location").notEmpty().withMessage("location required"),
]);
