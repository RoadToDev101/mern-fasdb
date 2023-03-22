const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  applicationName: {
    type: String,
    required: true,
    unique: true,
    default: "Default Application Name",
  },
  description: {
    type: String,
  },
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = {
  Application,
};
