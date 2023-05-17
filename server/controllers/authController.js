const { User } = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/bad-request");
const UnAuthenticatedError = require("../errors/unauthenticated");
const attachCookies = require("../utils/attachCookies");
const crypto = require("crypto");
const nodemailer = require("../services/nodemailer");

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
  const emailSent = await nodemailer.sendVerificationEmail(
    req,
    res,
    email,
    emailToken
  );
  Promise.all([emailSent, user]).catch(() => {
    throw new BadRequestError("Something went wrong, please try again later!");
  });

  // if (!emailSent) {
  //   throw new BadRequestError("Something went wrong, please try again later!");
  // }

  res.status(StatusCodes.CREATED).json({
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      emailToken: user.emailToken,
      role: user.role,
      EmailVerified: user.isEmailVerified,
      msg: `Email sent to ${user.email}, please verify your email address.`,
    },
  });
};

exports.verifyEmail = async (req, res) => {
  const requestUser = req.user?.userId;
  // console.log(req.user);
  if (!requestUser) {
    throw new BadRequestError("User not found!");
  }
  // console.log(requestUser);
  const alreadyVerified = await User.findOne({
    _id: requestUser,
    isEmailVerified: true,
  });

  if (alreadyVerified) {
    return res.status(StatusCodes.ACCEPTED).json({
      msg: "Email already verified",
    });
  }

  const { emailToken } = req.query;
  // console.log(emailToken);
  if (!emailToken) {
    throw new BadRequestError("No email token!");
  }
  const user = await User.findOneAndUpdate(
    { emailToken: emailToken },
    { role: "User", emailToken: null, isEmailVerified: true }
  );
  // console.log(user);
  if (!user) {
    throw new BadRequestError("Invalid email token!");
  }

  res.status(StatusCodes.OK).json({
    msg: "Email verified",
  });
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
