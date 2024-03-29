const { StatusCodes } = require("http-status-codes");
const multer = require("multer");
// Define an error handling middleware function
const errorHandlerMiddleware = (err, req, res, next) => {
  // Define a default error object with a default status code and message
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again later",
  };

  // If the error is a validation error, update the status code and message
  if (err.name === "ValidationError") {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    // Combine all the validation error messages into one string
    defaultError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }

  // If the error is a duplicate key error, update the status code and message
  if (err.code && err.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    // Use the name of the duplicate field in the error message
    const duplicateField = Object.keys(err.keyValue)[0];
    defaultError.msg = `This ${duplicateField.toUpperCase()} already exist!`;
  }

  // If the error is a Multer error, update the status code and message
  if (err instanceof multer.MulterError) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = err.message;
  }

  // Send the error response back to the client with the appropriate status code and message
  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

module.exports = errorHandlerMiddleware;
