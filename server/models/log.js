const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    method: {
      type: String,
      //enum: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"],
    },
    url: { type: String },
    statusCode: { type: Number },
    responseTime: { type: Number },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
