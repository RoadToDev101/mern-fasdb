const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    method: {
      type: String,
    },
    url: { type: String },
    statusCode: { type: Number },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    requestBody: { type: Object },
    requestParams: { type: Object },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
