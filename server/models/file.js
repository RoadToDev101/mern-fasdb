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

const ProductionDrawing = mongoose.model(
  "ProductionDrawing",
  productionDrawingSchema
);

module.exports = { ProductionDrawing };
