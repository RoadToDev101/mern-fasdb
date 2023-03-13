const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    minlength: [5, "Username must be at least 5 characters"],
    maxlength: [20, "Username must be at most 20 characters"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate:{validator: validator.isEmail, message: "Please provide a valid email"},
    unique: true,
  },
  // roleID: {
  //   type: mongoose.Types.ObjectId,
  //   ref: "Role",
  //   required: true,
  // },
});

userSchema.pre("save", async function (next) {
  // Hash password before saving to database
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.createJWT = function () {
  // Create JWT
  const token = jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const User = mongoose.model("User", userSchema);
const Role = mongoose.model("Role", roleSchema);

module.exports = { User, Role };
