const { ProductionDrawing } = require("../models/file.js");
const { Product } = require("../models/product.js");
const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/bad-request");
const NotFoundError = require("../errors/not-found");
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
  // console.log(req.query);

  const queryObj = {};

  //Search criteria
  if (drawingNameSearch) {
    queryObj.drawingName = { $regex: drawingNameSearch, $options: "i" };
  }
  // Filter documents based on the modelName field and ensure it matches the value of the modelNameSearch parameter
  if (modelNameSearch) {
    const products = await Product.find({
      modelName: { $regex: modelNameSearch, $options: "i" },
    });
    queryObj.productId = { $in: products.map((p) => p._id) };
  }

  //Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;

  const drawings = await ProductionDrawing.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "product",
      },
    },
    { $unwind: "$product" },
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
        modelName: "$product.models.modelName",
      },
    },
  ]).allowDiskUse(true);
  console.log(drawings);

  const totalDrawings = await ProductionDrawing.countDocuments(queryObj);

  res.status(StatusCodes.OK).json({
    success: true,
    totalDrawings,
    drawingName: drawings.map((drawing) => drawing.drawingName),
    version: drawings.map((drawing) => drawing.version),
    revisedDate: drawings.map((drawing) => drawing.revisedDate),
    createdBy: drawings.map((drawing) => drawing.createdBy),
    modelName: drawings.map((drawing) => drawing.modelName),
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
    throw new NotFoundError(`Product with modelName '${modelName}' not found`);
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

exports.getDrawing = async (req, res) => {
  const { drawingName, version } = req.query;
  if (!drawingName || !version)
    throw new BadRequestError("Please provide drawingName and version");

  const drawing = await ProductionDrawing.findOne({ drawingName, version });

  if (!drawing) {
    throw new NotFoundError(`${drawingName} version ${version} not found!`);
  }

  res.setHeader("Content-Type", "application/pdf");
  res.status(StatusCodes.OK).send(drawing.file);
};

exports.deleteDrawing = async (req, res) => {
  const { id: drawingId } = req.params;
  const drawing = await ProductionDrawing.findOneAndDelete({ _id: drawingId });

  if (!drawing) {
    throw new NotFoundError(`Drawing with id ${drawingId} not found`);
  }

  res.status(StatusCodes.ACCEPTED).json({
    msg: `Drawing deleted successfully`,
  });
};
