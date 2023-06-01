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
  const { drawingNameSearch, productNameSearch } = req.query;

  // Match stage for search criteria
  const matchStage = {};

  //Search criteria
  if (drawingNameSearch) {
    matchStage.drawingName = { $regex: drawingNameSearch, $options: "i" };
  }
  if (productNameSearch) {
    const regex = new RegExp(productNameSearch, "i");
    matchStage.$or = [
      { "productData.modelName": regex },
      // { "model.modelNumber": regex },
      // { "sku.skuCode": regex },
    ];
  }

  const pipeline = [];

  // Lookup stage for Product collection
  pipeline.push({
    $lookup: {
      from: "products",
      localField: "productId",
      foreignField: "_id",
      as: "productData",
    },
  });

  // Unwind stage for Product array
  pipeline.push({
    $unwind: { path: "$productData", preserveNullAndEmptyArrays: true },
  });

  // Lookup stage for Model collection
  // pipeline.push({
  //   $lookup: {
  //     from: "models",
  //     localField: "model",
  //     foreignField: "_id",
  //     as: "model",
  //   },
  // });

  // Unwind stage for Model array
  // pipeline.push({
  //   $unwind: { path: "$model", preserveNullAndEmptyArrays: true },
  // });

  // Lookup stage for SKU collection
  // pipeline.push({
  //   $lookup: {
  //     from: "skus",
  //     localField: "model.SKU",
  //     foreignField: "_id",
  //     as: "sku",
  //   },
  // });

  // Unwind stage for SKU array
  // pipeline.push({
  //   $unwind: { path: "$sku", preserveNullAndEmptyArrays: true },
  // });

  pipeline.push({ $match: matchStage });

  // Project stage to rename fields
  pipeline.push({
    $project: {
      _id: 0,
      drawingName: 1,
      version: 1,
      revisedDate: {
        $dateToString: {
          format: "%Y-%m-%dT%H:%M:%S.%LZ",
          date: "$revisedDate",
        },
      },
      createdBy: 1,
      modelName: "$productData.modelName",
    },
  });

  //Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  pipeline.push({ $skip: skip });
  pipeline.push({ $limit: limit });

  const drawingsPipeline = [...pipeline];
  const countPipeline = [...pipeline];
  countPipeline.push({ $count: "count" });

  const [drawings, countResult] = await Promise.all([
    ProductionDrawing.aggregate(drawingsPipeline).allowDiskUse(true),
    ProductionDrawing.aggregate(countPipeline).allowDiskUse(true),
  ]);

  const totalDrawings = countResult.length > 0 ? countResult[0].count : 0;
  const numOfPages = Math.ceil(totalDrawings / limit);

  res.status(StatusCodes.OK).json({
    success: true,
    totalDrawings,
    drawings,
    numOfPages,
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
    throw new NotFoundError(`Product with Model Name '${modelName}' not found`);
  }

  const file = req.file.buffer;
  if (!file) {
    throw new BadRequestError("Please upload a file");
  }

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

  // Update the productionDrawingID field of the product with the ID of the new production drawing
  await Product.updateOne(
    { _id: product._id },
    { $push: { productionDrawingID: productionDrawing._id } }
  );

  res.status(StatusCodes.CREATED).json({
    drawingId: productionDrawing._id,
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

  const drawingDeletionPromise = ProductionDrawing.findByIdAndDelete(drawingId);

  const productUpdatePromise = Product.updateMany(
    { productionDrawingID: drawingId },
    { $pull: { productionDrawingID: drawingId } }
  );

  await Promise.all([drawingDeletionPromise, productUpdatePromise])
    .then(() => {
      res.status(StatusCodes.ACCEPTED).json({
        msg: `Drawing deleted successfully`,
      });
    })
    .catch(() => {
      throw new BadRequestError(
        `Can not delete drawing with ID: ${drawingId}, please try again`
      );
    });
};
