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
  });
};

exports.updateUserRole = async (req, res) => {
  const { role, username } = req.body;

  if (!role || !username) {
    throw new BadRequestError("Please provide all values");
  }
  if (!req.user || !req.user.userId) {
    throw new UnAuthenticatedError("User is not authenticated");
  }

  const user = await User.findOne({ username });

  // If user is not found
  if (!user) {
    throw new NotFoundError(`User with username '${username}' not found`);
  }
  // If user is already got the role
  if (user.role === role) {
    throw new BadRequestError(`User already got the role '${role}'`);
  }
  // If target user is Super-Admin and current user is not Super-Admin
  if (user.role === "Super-Admin" && req.user.role !== "Super-Admin") {
    throw new BadRequestError(`Cannot change Super-Admin's role`);
  }

  user.role = role;

  await user.save();

  res.status(StatusCodes.OK).json({
    user,
    msg: `User ${username}'s role updated to '${role}' successfully`,
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

  await user.deleteOne();

  res.status(StatusCodes.OK).json({
    message: "User deleted",
  });
};
