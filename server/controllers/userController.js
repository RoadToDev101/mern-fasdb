const { User } = require("../models/user.js");
const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/bad-request");
const UnAuthenticatedError = require("../errors/unauthenticated");

exports.updateUsernameAndEmail = async (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    throw new BadRequestError("Please provide all values");
  }
  if (!req.user || !req.user.userId) {
    throw new UnAuthenticatedError("User is not authenticated");
  }

  const user = await User.findOne({ _id: req.user.userId });

  user.username = username;
  user.email = email;

  await user.save();

  // create a new token when user updates username or email (optional)
  token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user,
    token,
  });
};

exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  // Check if old password and new password and username or email are provided
  if (!oldPassword || !newPassword) {
    throw new BadRequestError("Please provide all values");
  }

  // Check if user is authenticated
  if (!req.user || !req.user.userId) {
    throw new UnAuthenticatedError("User is not authenticated");
  }

  const user = await User.findOne({ _id: req.user.userId }).select("+password");

  // Check if old password is correct
  const isMatch = await user.comparePassword(oldPassword);
  if (!isMatch) {
    throw new BadRequestError("Old password is incorrect");
  }

  user.password = newPassword;

  await user.save();

  // create a new token when user changes password (optional)
  token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user,
    token,
  });
};

// Delete user require password
exports.deleteUser = async (req, res) => {
  const { password } = req.body;

  // Check if password are provided
  if (!password) {
    throw new BadRequestError("Please provide all values");
  }

  // Check if user is authenticated
  if (!req.user || !req.user.userId) {
    throw new UnAuthenticatedError("User is not authenticated");
  }

  const user = await User.findOne({ _id: req.user.userId }).select("+password");

  // Check if password is correct
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new BadRequestError("Password is incorrect");
  }

  await user.remove();

  res.status(StatusCodes.OK).json({
    message: "User deleted",
  });
};
