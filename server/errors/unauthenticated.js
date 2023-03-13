const {StatusCodes} = require("http-status-codes");
const CustomAPIError = require("../errors/custom-api");

class UnAuthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnAuthenticatedError;