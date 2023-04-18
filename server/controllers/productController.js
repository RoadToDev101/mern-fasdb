const { Product } = require("../models/product.js");
const { User } = require("../models/user.js");
const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/bad-request");
const NotFoundError = require("../errors/not-found");

exports.createProduct = async (req, res) => {
  const { productType, modelName, company } = req.body;
  // Validate request
  if (!req.body) {
    throw new BadRequestError("Please provide all values!");
  }
  req.body.createdBy = req.user.userId;
  req.body.updatedBy = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({
    product,
  });
};

exports.getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({
    success: true,
    totalProducts: products.length,
    products,
    numOfPages: Math.ceil(products.length / 10),
  });
};

exports.updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const { productType, modelName, company, isActive } = req.body;
  // Validate request
  if (!req.body) {
    throw new BadRequestError("Please provide all values!");
  }
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new NotFoundError(`Product with id ${productId} not found!`);
  }
  const updatedBy = req.user.userId;
  const updatedProduct = await Product.findOneAndUpdate(
    { _id: productId },
    { productType, modelName, company, isActive, updatedBy },
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({
    success: true,
    updatedProduct,
  });
};

exports.deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new NotFoundError(`Product with id ${productId} not found!`);
  }

  await product.remove();
  res.status(StatusCodes.OK).json({
    msg: "Product deleted successfully",
  });
};
