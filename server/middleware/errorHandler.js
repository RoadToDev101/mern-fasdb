const { StatusCodes } = require("http-status-codes");
// Import the ValidationError and MongoError classes from Mongoose
const { ValidationError, MongoError } = require("mongoose").Error;

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

  // If the error is a validation error, update the status code and message
  if (err instanceof ValidationError) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    // Combine all the validation error messages into one string
    defaultError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }

  // If the error is a duplicate key error, update the status code and message
  if (err instanceof MongoError && err.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    // Use the field name from the validation error object in the error message
    const field = Object.keys(err.keyPattern)[0];
    defaultError.msg = `${field} field has to be unique`;
  }

  // If the error is a BadRequestError, update the status code and message
  if (err.constructor.name === "BadRequestError") {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = err.message;
  }

  // Send the error response back to the client with the appropriate status code and message
  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

module.exports = errorHandlerMiddleware;
