const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");
const authenticateUser = require("../middleware/auth");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: "Too many requests from this IP, please try again after 10 minutes",
});

/**
 *
 * @method POST /api/auth/register
 *
 * @method POST /api/auth/login
 *
 * @method PATCH /api/auth/update
 **/
router.post("/register", limiter, authController.register);
router.post("/login", limiter, authController.login);
router.get(
  "/get-current-user",
  authenticateUser,
  authController.getCurrentUser
);
router.get("/logout", authController.logout);
module.exports = router;
