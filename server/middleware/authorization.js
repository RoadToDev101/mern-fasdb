const ForbiddenError = require("../errors/forbidden");
const { User } = require("../models/user.js");
const accessControlLists = require("../utils/accessControlLists.js");

const authorization = async (req, res, next) => {
  const findUserRole = await User.findOne({ _id: req.user.userId });
  const userRole = findUserRole.role;

  const { path, method } = req;

  // Check if the requested path and method match the access control list
  const acl = accessControlLists.find(
    (acl) => acl.path === path && acl.methods.includes(method)
  );

  if (!acl) {
    // No access control rule found for this path and method, allow access
    return next();
  }

  // Check if the user's role is included in the access control list
  if (!acl.roles.includes(userRole)) {
    return next(
      new ForbiddenError("You are not authorized to perform this action")
    );
  }

  next();
};

module.exports = authorization;
