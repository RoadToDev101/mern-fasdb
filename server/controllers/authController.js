const { User } = require("../models/user.js");
const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/bad-request");
const UnAuthenticatedError = require("../errors/unauthenticated");
const attachCookies = require("../utils/attachCookies.js");

// Register user, check existing user through username or email, if not found, create new user
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

  // Check if email already exists
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }

  // Create a new user
  const user = await User.create({ username, email, password });
  const token = user.createJWT();

  attachCookies(res, token);

  res.status(StatusCodes.CREATED).json({
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
};

// Login user
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
  // console.log(user);

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
