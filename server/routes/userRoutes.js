const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");

router.patch("/updateUser", userController.updateUsernameAndEmail);
router.patch("/changePassword", userController.changePassword);
router.delete("/deleteUser", userController.deleteUser);

module.exports = router;
