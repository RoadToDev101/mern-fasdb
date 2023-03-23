const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");

router.patch("/update-user", userController.updateUsernameAndEmail);
router.patch("/change-password", userController.changePassword);
router.delete("/delete-user", userController.deleteUser);

module.exports = router;
