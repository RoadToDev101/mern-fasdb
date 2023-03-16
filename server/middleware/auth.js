const UnAuthenticatedError = require("../errors/unauthenticated");
const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    throw new UnAuthenticatedError("No token, authorization denied");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    throw new UnAuthenticatedError("Token is not valid");
  }
};

module.exports = authenticateUser;
