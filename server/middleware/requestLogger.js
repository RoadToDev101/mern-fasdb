const Log = require("../models/log");
const morgan = require("morgan");

// Define a custom format for morgan that includes the userId, statusCode, and responseTime
const logFormat =
  ":method :url :status :response-time ms - :res[content-length] :userId";

// Create a custom token for morgan to capture the userId
morgan.token("userId", (req, res) => req.userId || "-");

const requestLogger = async (req, res, next) => {
  // Use morgan to log the request
  morgan(logFormat, {
    stream: {
      write: (message) => {
        // Extract the log data from the message
        const [method, url, statusCode, responseTime, contentLength, userId] =
          message.trim().split(" ");

        // Create a log entry, handling the case when userId is "-"
        const log = new Log({
          method,
          url,
          statusCode,
          responseTime,
          userId: userId === "-" ? undefined : userId,
        });

        log
          .save()
          .then(() => {
            // Continue to the next middleware
            next();
          })
          .catch((error) => {
            // Handle the error
            console.error("Error saving log entry:", error);
            next(error);
          });
      },
    },
  })(req, res, next);
};

module.exports = requestLogger;
