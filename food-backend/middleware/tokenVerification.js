const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../models/userModel");

const isVerifiedUser = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return next(createHttpError(401, "Access token missing"));
    }

    const decodedToken = jwt.verify(accessToken, config.accessTokenSecret);

    const user = await User.findById(decodedToken._id).select("-password");

    if (!user) {
      return next(createHttpError(401, "User not found"));
    }

    req.user = user;
    next();

  } catch (error) {
    return next(createHttpError(401, "Invalid or expired token"));
  }
};

module.exports = { isVerifiedUser };
