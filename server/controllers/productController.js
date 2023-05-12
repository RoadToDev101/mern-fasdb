const { Product } = require("../models/product.js");
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
  });
};

exports.getAllProducts = async (req, res) => {
  const { productTypeSearch, modelNameSearch, companySearch, sortBy } =
    req.query;

  const queryObj = {};

  //Search criteria
  if (productTypeSearch && productTypeSearch !== "all") {
    queryObj.productLine = productTypeSearch;
  }
  if (modelNameSearch) {
    queryObj.modelName = { $regex: modelNameSearch, $options: "i" };
  }
  if (companySearch && companySearch !== "all") {
    queryObj.company = companySearch;
  }

  let queryResult = Product.find(queryObj);

  //Sorting
  if (sortBy === "a-z") queryResult = queryResult.sort(modelNameSearch);
  if (sortBy === "z-a") queryResult = queryResult.sort(-modelNameSearch);
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

exports.updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const { productLine, modelName, company } = req.body;
  // console.log(req.body.models);

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
