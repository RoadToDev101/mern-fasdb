const { ProductionDrawing, CodeReport } = require("../models/file.js");
const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/bad-request");
const UnAuthenticatedError = require("../errors/unauthenticated");

exports.getAllDrawings = async (req, res) => {
  console.log("all drawings retrieved");
};

exports.uploadDrawing = async (req, res) => {
  const { name, file } = req.body;
  if (!name || !file) {
    throw new BadRequestError("Please provide all values");
  }

  const productionDrawing = new ProductionDrawing({
    name,
    file,
  });

  await productionDrawing.save();

  res.status(StatusCodes.OK).json({
    productionDrawing,
  });
};

exports.deleteDrawing = async (req, res) => {
  console.log("file deleted");
};

exports.getAllCodeReports = async (req, res) => {
  console.log("all code reports retrieved");
};

exports.uploadCodeReport = async (req, res) => {
  console.log("code report uploaded");
};

exports.deleteCodeReport = async (req, res) => {
  console.log("code report deleted");
};
