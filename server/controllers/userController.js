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
  token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user,
    token,
  });
  // console.log(req.user);
  // res.status(StatusCodes.OK).json({
  //   message: "user updated",
  // });
};

exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new BadRequestError("Please provide all values");
  }
  if (!req.user || !req.user.userId) {
    throw new UnAuthenticatedError("User is not authenticated");
  }
  const user = await User.findOne({ _id: req.user.userId });
  const isMatch = await user.comparePassword(oldPassword);
  if (!isMatch) {
    throw new BadRequestError("Old password is incorrect");
  }
  user.password = newPassword;
  await user.save();
  token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user,
    token,
  });
};

exports.deleteUser = async (req, res) => {
  console.log("user deleted");
};
