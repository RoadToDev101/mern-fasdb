const { User } = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/bad-request");
const UnAuthenticatedError = require("../errors/unauthenticated");
const attachCookies = require("../utils/attachCookies");
const crypto = require("crypto");
const nodemailer = require("../services/nodemailer");
const e = require("express");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  // Check if username already exists
  const usernameAlreadyExists = await User.findOne({ username });
  if (usernameAlreadyExists) {
    throw new BadRequestError("Username already in use");
  }

  // Check if email already exists in db
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }

  const emailToken = crypto.randomBytes(64).toString("hex");

  const user = await User.create({
    username,
    email,
    emailToken,
    password,
  });
  const token = user.createJWT();

  attachCookies(res, token);

  // Send verification email
  nodemailer.sendVerificationEmail(req, res, email, emailToken);

  res.status(StatusCodes.CREATED).json({
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      emailToken: user.emailToken,
      role: user.role,
      EmailVerified: user.isEmailVerified,
    },
  });
};

exports.verifyEmail = async (req, res) => {
  const { emailToken } = req.query;
  const user = await User.findOne({ emailToken });
  if (!user) {
    res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Invalid token, please try again",
    });
    return;
  }

  user.emailToken = null;
  user.isEmailVerified = true;
  await user.save();
  res.status(StatusCodes.OK).json({
    msg: "Email verified",
  });
  res.redirect(`${req.headers.host}/register`);
};

exports.login = async (req, res) => {
  const { username, email, password } = req.body;

  if (!(username || email)) {
    throw new BadRequestError("Please provide username or email");
  }

  if (!password) {
    throw new BadRequestError("Please provide password");
  }

  // Check if user exists by username or email
  const user = await User.findOne({ $or: [{ username }, { email }] }).select(
    "+password"
  );
  if (!user) {
    throw new UnAuthenticatedError("User not found!");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Password is incorrect!");
  }

  const token = user.createJWT();
  user.password = undefined;

  attachCookies(res, token);

  res.status(StatusCodes.OK).json({
    user,
  });
};

exports.getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  res.status(StatusCodes.OK).json({
    user,
  });
};

exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.status(StatusCodes.OK).json({
    msg: "Logged out",
  });
};
