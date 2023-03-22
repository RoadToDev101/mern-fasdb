const mongoose = require("mongoose");

const threadTypeSchema = new mongoose.Schema({
  threadTypeName: {
    type: String,
    required: true,
    unique: true,
  },
});

const headTypeSchema = new mongoose.Schema({
  headTypeName: {
    type: String,
    required: true,
    unique: true,
  },
});

const driveTypeSchema = new mongoose.Schema({
  driveTypeName: {
    type: String,
    required: true,
    unique: true,
  },
});

const pointTypeSchema = new mongoose.Schema({
  pointTypeName: {
    type: String,
    required: true,
    unique: true,
  },
});

const shankTypeSchema = new mongoose.Schema({
  shankTypeName: {
    type: String,
    required: true,
    unique: true,
  },
});

const ThreadType = mongoose.model("ThreadType", threadTypeSchema);
const HeadType = mongoose.model("HeadType", headTypeSchema);
const DriveType = mongoose.model("DriveType", driveTypeSchema);
const PointType = mongoose.model("PointType", pointTypeSchema);
const ShankType = mongoose.model("ShankType", shankTypeSchema);

module.exports = {
  ThreadType,
  HeadType,
  DriveType,
  PointType,
  ShankType,
};
