const UnAuthenticatedError = require("../errors/unauthenticated");
const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) throw new UnAuthenticatedError("No token, authorization denied");
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(payload);
    req.user = { userId: payload.userId };
    next();
  } catch (err) {
    throw new UnAuthenticatedError("Token is not valid");
  }
};

module.exports = authenticateUser;
