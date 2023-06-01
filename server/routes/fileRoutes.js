const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController.js");
const requestLogger = require("../middleware/logger");

// Production Drawings API
router.get("/get-drawings", fileController.getAllDrawings);
router.get("/get-drawing", fileController.getDrawing);
router.post(
  "/upload-drawing",
  requestLogger,
  fileController.uploadDrawing,
  fileController.newDrawing
);
router.delete(
  "/delete-drawing/:id",
  requestLogger,
  fileController.deleteDrawing
);

module.exports = router;
