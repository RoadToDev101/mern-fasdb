const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");

router.patch("/update-username-email", userController.updateUsernameAndEmail);
router.patch("/update-role", userController.updateUserRole);
router.patch("/change-password", userController.changePassword);
router.delete("/delete-user", userController.deleteUser);

module.exports = router;
