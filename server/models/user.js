const mongoose = require("mongoose");
const validator = require("validator");

const roleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    required: true,
    unique: true,
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true, // `username` must be unique
    required: [true, "Username is required"], // Error message
    validator: [validator.isAlphanumeric, "Username must be alphanumeric"],
    minlength: [6, "Username must be at least 6 characters"],
    maxlength: [20, "Username must be at most 20 characters"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validator: [validator.isEmail, "Email is invalid"],
    unique: true,
  },
  // roleID: {
  //   type: mongoose.Types.ObjectId,
  //   ref: "Role",
  //   required: true,
  // },
});

const User = mongoose.model("User", userSchema);
const Role = mongoose.model("Role", roleSchema);

module.exports = { User, Role };
