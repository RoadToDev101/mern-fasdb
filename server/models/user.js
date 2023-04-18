const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
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
      validate: [validator.isEmail, "Please provide a valid email"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: ["User", "Editor", "Admin"],
      default: "User",
      required: [true, "Role is required"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // If password is not modified, return next
  if (!this.isModified("password")) return next();

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

userSchema.methods.comparePassword = async function (enteredPassword) {
  // Compare password
  const isMatch = await bcrypt.compare(enteredPassword, this.password);
  return isMatch;
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
