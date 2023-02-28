const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");

// API
router.post("/api/users", userController.create);
router.get("/api/users", userController.findAll);
router.get("/api/users/:userId", userController.findOne);
router.put("/api/users/:username", userController.update);
router.delete("/api/users/:userId", userController.delete);
module.exports = router;
