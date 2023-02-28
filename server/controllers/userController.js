const { User } = require("../models/user.js");

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a User
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });

  // Create new User into the database
  User.create(newUser, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else {
      res.send(data);
      console.log(`New User Created! Username: ${newUser.username}`);
    }
  });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  User.find({}, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else {
      res.send(data);
      console.log(`All Users Retrieved!`);
    }
  });
};

// Find a single User with a userId
exports.findOne = (req, res) => {
  User.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.userId,
        });
      }
    } else res.send(data);
  });
};

// Update a User identified by the username in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  User.findOneAndUpdate(
    { username: req.params.username },
    { $set: req.body },
    { new: true },
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with Username ${req.params.username}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.username,
          });
        }
      } else {
        res.send(data);
        console.log(`USER UPDATED! Username: ${req.params.username}`);
      }
    }
  );
};

// Delete a User with the specified userId in the request
exports.delete = (req, res) => {
  User.findByIdAndDelete(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.userId,
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};
