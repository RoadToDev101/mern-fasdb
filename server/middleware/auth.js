//TODO: Check authorization of user later
const UnAuthenticatedError = require("../errors/unauthenticated");
const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
  // const token = req.cookies.token;
  // if (!token) {
  //   throw new UnAuthenticatedError("No token, authorization denied");
  // }
  // try {
  //   const payload = jwt.verify(token, process.env.JWT_SECRET);
  //   req.user = payload;
  //   next();
  // } catch (err) {
  //   throw new UnAuthenticatedError("Token is not valid");
  // }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnAuthenticatedError("No token, authorization denied");
  }
  const token = authHeader.split(" ")[1];
  // console.log(token);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);
    req.user = { userId: payload.userId };
    next();
  } catch (err) {
    throw new UnAuthenticatedError("Token is not valid");
  }
};

module.exports = authenticateUser;
