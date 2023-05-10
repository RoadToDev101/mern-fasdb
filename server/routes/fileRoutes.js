const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController.js");
const checkPermission = require("../middleware/authorization.js");

// Production Drawings API
router.get("/get-drawings", fileController.getAllDrawings);
router.post(
  "/new-drawing",
  checkPermission,
  fileController.uploadDrawing,
  fileController.newDrawing
);
router.delete(
  "/api/drawings/:id",
  checkPermission,
  fileController.deleteDrawing
);

module.exports = router;
