const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");

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
router.patch("/update", authController.updateUser);
module.exports = router;
