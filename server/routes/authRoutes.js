const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");
const authenticateUser = require("../middleware/authentication.js");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: "Too many requests from this IP, please try again after 10 minutes",
});

router.post("/register", limiter, authController.register);
router.get("/verify-email", authenticateUser, authController.verifyEmail);
router.post("/login", limiter, authController.login);
router.get(
  "/get-current-user",
  authenticateUser,
  authController.getCurrentUser
);
router.get("/logout", authController.logout);
module.exports = router;
