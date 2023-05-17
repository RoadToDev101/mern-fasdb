const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController.js");
const requestLogger = require("../middleware/requestLogger");

// Production Drawings API
router.get("/get-drawings", fileController.getAllDrawings);
router.get("/get-drawing", fileController.getDrawing);
router.post(
  "/create-drawing",
  fileController.uploadDrawing,
  fileController.newDrawing,
  requestLogger
);
router.delete(
  "/delete-drawing/:id",
  fileController.deleteDrawing,
  requestLogger
);

module.exports = router;
