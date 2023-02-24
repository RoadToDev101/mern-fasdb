const mongoose = require("mongoose");

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
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  roleID: {
    type: mongoose.Types.ObjectId,
    ref: "Role",
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Role = mongoose.model("Role", roleSchema);

module.exports = { User, Role };
