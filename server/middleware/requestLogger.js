const Log = require("../models/log");

const requestLogger = async (req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    next();
  }
  // Save the log to the database
  try {
    const { method, url } = req;
    const statusCode = res.statusCode;
    const userId = req.user ? req.user.userId : null;

    const log = new Log({
      method,
      url,
      statusCode,
      requestBody: req.body,
      requestParams: req.params,
      userId,
    });

    await log.save();
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = requestLogger;
