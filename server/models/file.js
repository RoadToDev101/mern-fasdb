const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const productionDrawingSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: [true, "Please provide product"],
    },
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
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

productionDrawingSchema.index({ drawingName: 1, version: 1 }, { unique: true });
productionDrawingSchema.plugin(uniqueValidator);
const ProductionDrawing = mongoose.model(
  "ProductionDrawing",
  productionDrawingSchema
);

module.exports = { ProductionDrawing };
