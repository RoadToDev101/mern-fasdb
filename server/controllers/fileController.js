const { ProductionDrawing } = require("../models/file.js");
const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/bad-request");
const multer = require("multer");
// Create a storage engine for multer
const storage = multer.memoryStorage();

// Configure multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // limit file size to 5 MB
});

exports.getAllDrawings = async (req, res) => {
  const drawings = await ProductionDrawing.find();
  res.status(StatusCodes.OK).json({
    drawings,
  });
};

exports.uploadDrawing = async (req, res, next) => {
  // Use multer to upload the file and extract the drawingName, version, and file buffer
  const uploadMiddleware = upload.single("file");
  uploadMiddleware(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      throw new BadRequestError("File upload error");
    } else if (err) {
      throw new BadRequestError("Unknown error");
    }

    const { drawingName, version, revisedDate } = req.body;

    // Check if a drawing with the same name and version already exists
    const existingDrawing = await ProductionDrawing.findOne({
      drawingName,
      version,
    });
    if (existingDrawing) {
      throw new BadRequestError(
        `${drawingName} version ${version} already exists`
      );
    }

    const file = req.file.buffer;

    // Create a new production drawing document and save it to the database
    const productionDrawing = new ProductionDrawing({
      drawingName,
      version,
      file,
      revisedDate,
    });

    try {
      await productionDrawing.save();
      res.status(StatusCodes.CREATED).json({
        drawingName,
        version,
        revisedDate,
        msg: "Production Drawing upload successfully",
      });
    } catch (err) {
      next(err);
    }
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
