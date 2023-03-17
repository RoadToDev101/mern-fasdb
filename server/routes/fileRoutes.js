const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController.js");

// Production Drawings API
router.get("/get-drawings", fileController.getAllDrawings);

router.post("/upload-drawing", fileController.uploadDrawing);
router.delete("/api/drawings/:id", fileController.deleteDrawing);

// Code Reports API
router.get("/api/code-reports", fileController.getAllCodeReports);

router.post("/api/code-reports", fileController.uploadCodeReport);
router.delete("/api/code-reports/:id", fileController.deleteCodeReport);

module.exports = router;
