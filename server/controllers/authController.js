const { User } = require("../models/user.js");
const { StatusCodes } = require("http-status-codes");

// Register user, check existing user through username or email, if not found, create new user
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("please provide all values");
  }

  // Check if user already exists
  const userAlreadyExists = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }

  // Create a new user
  const user = await User.create({ name, email, password });
  await user.save();
  res.send(user);
};

// Login user
exports.login = (req, res) => {
  res.send("login");
};

exports.updateUser = (req, res) => {
  //   // Validate Request
  //   if (!req.body) {
  //     res.status(400).send({
  //       message: "Content can not be empty!",
  //     });
  //   }

  //   User.updateById(req.params.username, new User(req.body), (err, data) => {
  //     if (err) {
  //       if (err.kind === "not_found") {
  //         res.status(404).send({
  //           message: `Not found User with username ${req.params.username}.`,
  //         });
  //       } else {
  //         res.status(500).send({
  //           message: "Error updating User with username " + req.params.username,
  //         });
  //       }
  //     } else res.send(data);
  //   });
  res.send("updateUser");
};
