const mongoose = require("mongoose");

const skuSchema = new mongoose.Schema(
  {
    modelId: {
      type: mongoose.Types.ObjectId,
      ref: "Model",
      required: [true, "Please provide model"],
    },
    skuCode: {
      type: String,
      unique: [true, "SKU code must be unique"],
      required: [true, "SKU code is required"],
    },
    commercialDimensions: {
      overallLength: {
        type: Number,
      },
      size: {
        type: String,
      },
      headDiameter: {
        type: Number,
      },
      threadLength: {
        type: Number,
      },
      shankDiameter: {
        type: Number,
      },
      nailGauge: {
        type: String,
      },
    },
    status: {
      type: String,
      enum: ["Active", "Obsolete", "Discontinued"],
      required: [true, "Please provide status"],
      default: "Active",
    },
    packagingQuantity: {
      type: Number,
    },
    isCollated: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

const SKU = mongoose.model("SKU", skuSchema);

module.exports = { SKU };
