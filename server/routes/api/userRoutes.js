const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController.js");
const requestLogger = require("../../middleware/logger.js");

router.patch("/update-username-email", userController.updateUsernameAndEmail);
router.patch("/update-role", requestLogger, userController.updateUserRole);
router.patch("/change-password", userController.changePassword);
router.delete("/delete-user", requestLogger, userController.deleteUser);

module.exports = router;
