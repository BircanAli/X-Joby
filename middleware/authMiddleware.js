import { UnauthenticatedError } from "../errors/customError.js";
import User from "../models/UserModels.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("authentication invalid");
  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("authorization invalid");
  }
};

export const authorizePermissions = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role))
      throw new UnauthenticatedError("Unauthorized to access this route");
    next();
  };
};
