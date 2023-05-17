const ForbiddenError = require("../errors/forbidden");
const NotFoundError = require("../errors/not-found");
const UnAuthenticatedError = require("../errors/unauthenticated");
const { User } = require("../models/user.js");
const accessControlLists = require("../utils/accessControlLists.js");
const pathToRegexp = require("path-to-regexp").pathToRegexp;

const authorization = async (req, res, next) => {
  const findUser = await User.findOne({ _id: req.user.userId });
  if (!findUser) {
    throw new UnAuthenticatedError("User not found, authorization denied");
  }

  const userRole = findUser.role;

  const { path, method } = req;

  // Handle dynamic routes
  const acl = accessControlLists.find((acl) => {
    const keys = [];
    const pattern = pathToRegexp(acl.path, keys, { strict: true });
    const match = pattern.exec(path);
    if (match && acl.methods.includes(method)) {
      req.params = {};
      for (let i = 0; i < keys.length; i++) {
        req.params[keys[i].name] = match[i + 1];
      }
      return true;
    }
    return false;
  });

  if (!acl) {
    console.log(
      `No access control rule found for path ${path} and method ${method}`
    );
    throw new NotFoundError("No access control rule found for this route");
  }

  // Check if the user's role is included in the access control list
  if (!acl.roles.includes(userRole)) {
    throw new ForbiddenError("You are not authorized to access this route");
  }

  next();
};

module.exports = authorization;
