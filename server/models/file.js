const mongoose = require("mongoose");

const productionDrawingSchema = new mongoose.Schema({
  drawingName: {
    type: String,
    required: true,
  },
  version: {
    type: String,
    required: true,
  },
  file: {
    type: Buffer,
    required: true,
  },
  revisedDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

productionDrawingSchema.index({ drawingName: 1, version: 1 }, { unique: true });

const codeReportSchema = new mongoose.Schema({
  code: {
    type: String,
  },
  file: {
    type: Buffer,
  },
  revisedDate: {
    type: Date,
    default: Date.now,
  },
});

const ProductionDrawing = mongoose.model(
  "ProductionDrawing",
  productionDrawingSchema
);

const CodeReport = mongoose.model("CodeReport", codeReportSchema);

module.exports = { ProductionDrawing, CodeReport };
