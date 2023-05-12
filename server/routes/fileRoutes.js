const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController.js");
const authorization = require("../middleware/authorization.js");

// Production Drawings API
router.get("/get-drawings", fileController.getAllDrawings);
router.get("/get-drawing", fileController.getDrawing);
router.post(
  "/create-drawing",
  fileController.uploadDrawing,
  fileController.newDrawing
);
router.delete("/delete-drawing/:id", fileController.deleteDrawing);

module.exports = router;
