const { Product } = require("../models/product.js");
const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/bad-request");
const NotFoundError = require("../errors/not-found");
const mongoose = require("mongoose");

exports.createProduct = async (req, res) => {
  const { productLine, modelName, company } = req.body;
  // Validate request
  if (!productLine || !modelName || !company) {
    throw new BadRequestError("Please provide all values!");
  }

  req.body.createdBy = req.user.userId;
  req.body.updatedBy = req.user.userId;

  const newProduct = new Product(req.body);
  await newProduct.save();
  res.status(StatusCodes.CREATED).json({
    newProduct,
  });
};

exports.getAllProducts = async (req, res) => {
  const {
    productLineSearch,
    productNameSearch,
    companySearch,
    applicationSearch,
    materialSearch,
    corrosionResistanceSearch,
    coatingSearch,
    headTypeSearch,
    driveTypeSearch,
    pointTypeSearch,
    threadTypeSearch,
    shankTypeSearch,
    sortBy,
  } = req.query;

  const queryObj = {};

  //Search criteria
  if (productLineSearch && productLineSearch.length > 0) {
    queryObj["productLine"] = { $in: productLineSearch };
  }
  if (productNameSearch) {
    const regex = new RegExp(productNameSearch, "i");
    queryObj.$or = [
      { modelName: regex },
      { "model.modelNumber": regex },
      { "model.SKU.skuCode": regex },
    ];
  }
  if (companySearch && companySearch.length > 0) {
    queryObj["company"] = { $in: companySearch };
  }
  if (applicationSearch && applicationSearch.length > 0) {
    queryObj["application"] = { $in: applicationSearch };
  }
  if (materialSearch && materialSearch.length > 0) {
    queryObj["model.material"] = { $in: materialSearch };
  }
  if (corrosionResistanceSearch && corrosionResistanceSearch !== "all") {
    queryObj["model.corrosionResistance"] = { $in: corrosionResistanceSearch };
  }
  if (coatingSearch && coatingSearch.length > 0) {
    queryObj["model.coatings.coating"] = { $in: coatingSearch };
  }
  if (headTypeSearch && headTypeSearch.length > 0) {
    queryObj["model.feature.headType"] = { $in: headTypeSearch };
  }
  if (driveTypeSearch && driveTypeSearch.length > 0) {
    queryObj["model.feature.driveType"] = { $in: driveTypeSearch };
  }
  if (pointTypeSearch && pointTypeSearch.length > 0) {
    queryObj["model.feature.pointType"] = { $in: pointTypeSearch };
  }
  if (threadTypeSearch && threadTypeSearch.length > 0) {
    queryObj["model.feature.threadTypes.threadType"] = {
      $in: threadTypeSearch,
    };
  }
  if (shankTypeSearch && shankTypeSearch.length > 0) {
    queryObj["model.feature.shankTypes.shankType"] = { $in: shankTypeSearch };
  }
  // console.log(queryObj);

  let queryResult = Product.find(queryObj);

  //Sorting
  if (sortBy === "a-z") queryResult = queryResult.sort(productNameSearch);
  if (sortBy === "z-a") queryResult = queryResult.sort(-productNameSearch);
  if (sortBy === "oldest") queryResult = queryResult.sort("updatedAt");
  if (sortBy === "latest") queryResult = queryResult.sort("-updatedAt");

  //Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;

  queryResult = queryResult.skip(startIndex).limit(limit);

  const products = await queryResult;

  const totalProducts = await Product.countDocuments(queryObj);

  res.status(StatusCodes.OK).json({
    success: true,
    totalProducts, // Cant use products.length because of limit
    products,
    numOfPages: Math.ceil(totalProducts / limit),
  });
};

exports.compareModels = async (req, res) => {
  const { modelIds } = req.body;

  if (!Array.isArray(modelIds) || modelIds.length < 2) {
    throw new BadRequestError("Please provide at least two models to compare!");
  }

  const pipeline = [
    {
      $unwind: "$model",
    },
    {
      $match: {
        "model._id": {
          $in: modelIds.map((id) => new mongoose.Types.ObjectId(id)),
        },
      },
    },
    {
      $project: {
        _id: "$model._id",
        modelNumber: "$model.modelNumber",
        material: "$model.material",
        coatings: "$model.coatings",
        corrosionResistance: "$model.corrosionResistance",
        feature: "$model.feature",
        // TODO: Add other necessary fields for comparison
      },
    },
  ];

  // Return the models with the specified ids
  const models = await Product.aggregate(pipeline);

  if (models.length !== modelIds.length) {
    throw new NotFoundError("One or more models not found!");
  }

  res.status(StatusCodes.OK).json({
    success: true,
    totalModels: models.length,
    models,
  });
};

exports.updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const { productLine, modelName, company } = req.body;
  // console.log(req.body.model);

  // Validate request
  if (!productLine || !modelName || !company) {
    throw new BadRequestError("Please provide all values!");
  }

  const updatedBy = req.user.userId;

  const result = await Product.findOneAndUpdate(
    { _id: productId },
    { ...req.body, updatedBy },
    { new: true }
  );

  if (!result) {
    throw new NotFoundError(`Product with id ${productId} not found!`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    updatedProduct: result,
  });
};

exports.deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  const deletedProduct = await Product.findOneAndDelete({ _id: productId });

  if (!deletedProduct) {
    throw new NotFoundError(`Product with id ${productId} not found!`);
  }

  res.status(StatusCodes.ACCEPTED).json({
    msg: "Product deleted successfully",
  });
};
