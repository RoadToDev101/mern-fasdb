const { Product } = require("../models/product.js");
const { Model } = require("../models/product-model.js");
const { SKU } = require("../models/model-sku.js");
const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/bad-request");
const NotFoundError = require("../errors/not-found");

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
    msg: "Product created successfully",
  });
};

exports.createModel = async (req, res) => {
  const { modelName, modelNumber, material } = req.body;
  // Validate request
  if (!modelName || !modelNumber || !material) {
    throw new BadRequestError("Please provide all values!");
  }

  const existingProduct = await Product.findOne({ modelName });
  if (!existingProduct) {
    throw new NotFoundError(`Product with Model Name '${modelName}' not found`);
  }

  req.body.createdBy = req.user.userId;
  req.body.updatedBy = req.user.userId;

  const newModel = new Model({
    productId: existingProduct._id,
    ...req.body,
  });
  await newModel.save();

  await Product.updateOne(
    { _id: existingProduct._id },
    { $push: { model: newModel._id } }
  );

  res.status(StatusCodes.CREATED).json({
    newModel,
    msg: "Model created successfully",
  });
};

exports.createSKU = async (req, res) => {
  const { modelNumber, skuCode } = req.body;
  // Validate request
  if (!skuCode) {
    throw new BadRequestError("Please provide SKU Code!");
  }

  const existingModel = await Model.findOne({ modelNumber });
  if (!existingModel) {
    throw new NotFoundError(
      `Model with Model Number '${modelNumber}' not found`
    );
  }

  req.body.createdBy = req.user.userId;
  req.body.updatedBy = req.user.userId;

  const newSKU = new SKU({
    modelId: existingModel._id,
    ...req.body,
  });
  await newSKU.save();

  await Model.updateOne(
    { _id: existingModel._id },
    { $push: { SKU: newSKU._id } }
  );

  res.status(StatusCodes.CREATED).json({
    newSKU,
    msg: "SKU created successfully",
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

  const pipeline = [];

  // Lookup stage for Model collection
  pipeline.push({
    $lookup: {
      from: "models",
      localField: "model",
      foreignField: "_id",
      as: "modelData",
    },
  });

  // Unwind stage for Model array
  pipeline.push({ $unwind: "$modelData" });

  // Lookup stage for SKU collection
  pipeline.push({
    $lookup: {
      from: "skus",
      localField: "modelData.SKU",
      foreignField: "_id",
      as: "skuData",
    },
  });

  // Unwind stage for SKU array
  pipeline.push({ $unwind: "$skuData" });

  // Match stage for search criteria
  const matchStage = {};

  if (productLineSearch && productLineSearch.length > 0) {
    matchStage.productLine = { $in: productLineSearch };
  }

  if (productNameSearch) {
    const regex = new RegExp(productNameSearch, "i");
    matchStage.$or = [
      { modelName: regex },
      { "modelData.modelNumber": regex },
      { "skuData.skuCode": regex },
    ];
  }

  if (companySearch && companySearch.length > 0) {
    matchStage.company = { $in: companySearch };
  }

  if (applicationSearch && applicationSearch.length > 0) {
    matchStage.application = { $in: applicationSearch };
  }

  if (materialSearch && materialSearch.length > 0) {
    matchStage["modelData.material"] = { $in: materialSearch };
  }

  if (corrosionResistanceSearch && corrosionResistanceSearch !== "all") {
    matchStage["modelData.corrosionResistance"] = {
      $in: corrosionResistanceSearch,
    };
  }

  if (coatingSearch && coatingSearch.length > 0) {
    matchStage["modelData.coatings.coating"] = { $in: coatingSearch };
  }

  if (headTypeSearch && headTypeSearch.length > 0) {
    matchStage["modelData.feature.headType"] = { $in: headTypeSearch };
  }

  if (driveTypeSearch && driveTypeSearch.length > 0) {
    matchStage["modelData.feature.driveType"] = { $in: driveTypeSearch };
  }

  if (pointTypeSearch && pointTypeSearch.length > 0) {
    matchStage["modelData.feature.pointType"] = { $in: pointTypeSearch };
  }

  if (threadTypeSearch && threadTypeSearch.length > 0) {
    matchStage["modelData.feature.threadTypes.threadType"] = {
      $in: threadTypeSearch,
    };
  }

  if (shankTypeSearch && shankTypeSearch.length > 0) {
    matchStage["modelData.feature.shankTypes.shankType"] = {
      $in: shankTypeSearch,
    };
  }

  pipeline.push({ $match: matchStage });

  // Sorting
  const sortStage = {};

  if (sortBy === "a-z") {
    sortStage.modelName = 1;
  } else if (sortBy === "z-a") {
    sortStage.modelName = -1;
  } else if (sortBy === "oldest") {
    sortStage.updatedAt = 1;
  } else if (sortBy === "latest") {
    sortStage.updatedAt = -1;
  }

  pipeline.push({ $sort: sortStage });

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  pipeline.push({ $skip: skip });
  pipeline.push({ $limit: limit });

  // console.log("Pipeline:", JSON.stringify(pipeline, null, 2));
  const products = await Product.aggregate(pipeline);
  // console.log("Products:", JSON.stringify(products, null, 2));
  const totalProducts = await Product.countDocuments(matchStage);
  const numOfPages = Math.ceil(totalProducts / limit);

  res.json({
    products,
    page,
    limit,
    totalProducts,
    numOfPages,
  });
};

exports.compareModels = async (req, res) => {
  const { modelIds } = req.body;

  if (!Array.isArray(modelIds) || modelIds.length < 2) {
    throw new BadRequestError("Please provide at least two models to compare!");
  }

  // Return the models with the specified ids
  const models = await Model.find({ _id: { $in: modelIds } });

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

exports.updateModel = async (req, res) => {
  const { id: modelId } = req.params;
  const { modelNumber, material } = req.body;

  if (!modelNumber || !material) {
    throw new BadRequestError("Please provide all values!");
  }

  const updatedBy = req.user.userId;

  const result = await Model.findOneAndUpdate(
    { _id: modelId },
    { ...req.body, updatedBy },
    { new: true }
  );

  if (!result) {
    throw new NotFoundError(`Model with id ${modelId} not found!`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    updatedModel: result,
  });
};

exports.updateSKU = async (req, res) => {
  const { id: skuId } = req.params;
  const { skuCode } = req.body;

  if (!skuCode) {
    throw new BadRequestError("Please provide SKU code!");
  }

  const updatedBy = req.user.userId;

  const result = await SKU.findOneAndUpdate(
    { _id: skuId },
    { ...req.body, updatedBy },
    { new: true }
  );

  if (!result) {
    throw new NotFoundError(`SKU with id ${skuId} not found!`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    updatedSKU: result,
  });
};

exports.deleteProduct = async (req, res) => {
  const { id: productId } = req.params;

  const deletedProduct = await Product.findOneAndDelete({ _id: productId });
  if (!deletedProduct) {
    throw new NotFoundError(`Product with id ${productId} not found!`);
  }

  const models = await Model.find({ productId: productId });
  const modelIds = models.map((m) => m._id);

  await Model.deleteMany({ productId: productId });
  await SKU.deleteMany({ modelId: { $in: modelIds } });

  res.status(StatusCodes.ACCEPTED).json({
    msg: "Product deleted successfully",
  });
};

exports.deleteModel = async (req, res) => {
  const { id: modelId } = req.params;

  const deletedModel = await Model.findByIdAndDelete(modelId);
  if (!deletedModel) {
    throw new NotFoundError(`Model with id ${modelId} not found!`);
  }

  await Product.updateMany({ model: modelId }, { $pull: { model: modelId } });
  await SKU.deleteMany({ modelId: modelId });

  res.status(StatusCodes.ACCEPTED).json({
    msg: "Model deleted successfully",
  });
};

exports.deleteSKU = async (req, res) => {
  const { id: skuId } = req.params;

  const deletedSKU = await SKU.findByIdAndDelete(skuId);

  if (!deletedSKU) {
    throw new NotFoundError(`SKU with id ${skuId} not found!`);
  }

  await Model.updateMany({ SKU: skuId }, { $pull: { SKU: skuId } });

  res.status(StatusCodes.ACCEPTED).json({
    msg: "SKU deleted successfully",
  });
};
