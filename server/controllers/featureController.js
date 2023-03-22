const {
  ThreadType,
  HeadType,
  DriveType,
  PointType,
  ShankType,
} = require("../models/feature");
const { StatusCodes } = require("http-status-codes");

// @desc    Get all thread types
exports.getThreadTypes = async (req, res, next) => {
  try {
    const threadTypes = await ThreadType.find();
    res.status(StatusCodes.OK).json({
      success: true,
      count: threadTypes.length,
      data: threadTypes,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Get all head types
exports.getHeadTypes = async (req, res, next) => {
  try {
    const headTypes = await HeadType.find();
    res.status(StatusCodes.OK).json({
      success: true,
      count: headTypes.length,
      data: headTypes,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Get all drive types
exports.getDriveTypes = async (req, res, next) => {
  try {
    const driveTypes = await DriveType.find();
    res.status(StatusCodes.OK).json({
      success: true,
      count: driveTypes.length,
      data: driveTypes,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Get all point types
exports.getPointTypes = async (req, res, next) => {
  try {
    const pointTypes = await PointType.find();
    res.status(StatusCodes.OK).json({
      success: true,
      count: pointTypes.length,
      data: pointTypes,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Get all shank types
exports.getShankTypes = async (req, res, next) => {
  try {
    const shankTypes = await ShankType.find();
    res.status(StatusCodes.OK).json({
      success: true,
      count: shankTypes.length,
      data: shankTypes,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: "Server Error",
    });
  }
};

// Get all feature types
exports.getAllFeatureTypes = async (req, res, next) => {
  try {
    const threadTypes = await ThreadType.find();
    const headTypes = await HeadType.find();
    const driveTypes = await DriveType.find();
    const pointTypes = await PointType.find();
    const shankTypes = await ShankType.find();
    res.status(StatusCodes.OK).json({
      threadTypes,
      headTypes,
      driveTypes,
      pointTypes,
      shankTypes,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: "Server Error",
    });
  }
};
