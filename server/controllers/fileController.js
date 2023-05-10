const { ProductionDrawing } = require("../models/file.js");
const { Product } = require("../models/product.js");
const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/bad-request");
const multer = require("multer");
// Create a storage engine for multer
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  // Check if the file is a PDF
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new BadRequestError("File must be a PDF"), false);
  }
};

// Configure multer
const upload = multer({
  storage: multerStorage,
  limits: { fileSize: 5000000 }, // limit file size to 5 MB
  fileFilter: multerFilter,
});

exports.getAllDrawings = async (req, res) => {
  const { drawingNameSearch, modelNameSearch } = req.query;
  console.log(req.query);

  const queryObj = {};

  //Search criteria
  if (drawingNameSearch) {
    queryObj.drawingName = { $regex: drawingNameSearch, $options: "i" };
  }
  if (modelNameSearch) {
    queryObj.modelName = { $regex: modelNameSearch, $options: "i" };
  }

  //Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;

  const drawings = await ProductionDrawing.aggregate([
    { $match: queryObj },
    { $skip: startIndex },
    { $limit: limit },
    {
      $project: {
        _id: 0,
        drawingName: 1,
        version: 1,
        revisedDate: 1,
        createdBy: 1,
      },
    },
  ]).allowDiskUse(true);

  const totalDrawings = await ProductionDrawing.countDocuments(queryObj);

  res.status(StatusCodes.OK).json({
    success: true,
    totalDrawings,
    drawingName: drawings.map((drawing) => drawing.drawingName),
    version: drawings.map((drawing) => drawing.version),
    revisedDate: drawings.map((drawing) => drawing.revisedDate),
    createdBy: drawings.map((drawing) => drawing.createdBy),
    numOfPages: Math.ceil(totalDrawings / limit),
  });
};

// Use multer to upload a single file
exports.uploadDrawing = upload.single("file");

exports.newDrawing = async (req, res) => {
  const { drawingName, version, revisedDate, modelName } = req.body;

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

  // Find the product with the matching modelName
  const product = await Product.findOne({ modelName });
  if (!product) {
    throw new BadRequestError(
      `Product with modelName '${modelName}' not found`
    );
  }

  const file = req.file.buffer;

  // Create a new production drawing document and save it to the database
  const productionDrawing = new ProductionDrawing({
    productId: product._id,
    drawingName,
    version,
    file,
    revisedDate,
    createdBy: req.user.userId,
  });
  await productionDrawing.save();

  // Update and save the productionDrawingID field of the product with the ID of the new production drawing
  product.productionDrawingID.push(productionDrawing._id);
  await product.save();

  res.status(StatusCodes.CREATED).json({
    productId: product._id,
    drawingName,
    version,
    revisedDate,
    createdBy: req.user.userId,
    msg: "Production Drawing upload successfully",
  });
};

exports.deleteDrawing = async (req, res) => {
  console.log("file deleted");
};
