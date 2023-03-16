const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");
const authenticateUser = require("../middleware/auth");
/**
 *
 * @method POST /api/auth/register
 *
 * @method POST /api/auth/login
 *
 * @method PATCH /api/auth/update
 **/
router.post("/register", authController.register);
router.post("/login", authController.login);

router.patch("/updateUser", authenticateUser, authController.updateUser);
module.exports = router;
