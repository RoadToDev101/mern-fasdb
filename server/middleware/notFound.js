const { StatusCodes } = require("http-status-codes");

const notFoundMiddleware = (req, res, next) => {
  const error = new Error(`Route - ${req.originalUrl} - not found.`);
  res.status(StatusCodes.NOT_FOUND);
  next(error);
};

module.exports = notFoundMiddleware;
