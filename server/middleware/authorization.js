const ForbiddenError = require("../errors/forbidden");
const { User } = require("../models/user.js");

//Check if the user requesting role is "User" then throw an error
const checkPermission = async (req, res, next) => {
  const findUserRole = await User.findOne({ _id: req.user.userId });
  const userRole = findUserRole.role;
  if (userRole !== ("Admin" || "Editor")) {
    throw new ForbiddenError("You are not authorized to perform this action");
  }
  next();
};

module.exports = checkPermission;
