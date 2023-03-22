const { Product } = require("../models/product.js");
const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/bad-request");
const UnAuthenticatedError = require("../errors/unauthenticated");

// Create and save product into the database
exports.createProduct = async (req, res) => {
  const { productType, modelName, company } = req.body;
  // Validate request
  if (!req.body) {
    throw new BadRequestError("Content cannot be empty!");
  }
  req.body.createdBy = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({
    product,
  });
};
