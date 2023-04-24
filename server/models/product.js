const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
// const { ProductionDrawing, CodeReport } = require("./file.js");

const productSchema = new mongoose.Schema(
  {
    productLine: {
      type: String,
      enum: ["Screw", "Nail", "Anchor", "Other"],
      required: [true, "Please provide product line"],
      default: "Screw",
    },
    modelName: {
      type: String,
      uppercase: true,
      required: [true, "Please provide model name"],
      unique: true,
      index: true,
      uniqueCaseInsensitive: true,
    },
    company: {
      type: String,
      enum: ["Simpson Strong-Tie", "Hilti", "DeWalt", "Other"],
      required: [true, "Please provide company name"],
      default: "Simpson Strong-Tie",
    },
    isActive: {
      type: Boolean,
      default: true,
      required: [true, "Please provide active status"],
    },
    models: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Model",
      },
    ],
    // productionDrawingID: [
    //   {
    //     type: mongoose.Types.ObjectId,
    //     ref: "ProductionDrawing",
    //   },
    // ],
    // codeReports: [
    //   {
    //     type: String,
    //     unique: true,
    //   },
    // ],
    application: [
      {
        type: String,
        unique: true,
      },
    ],
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

productSchema.plugin(uniqueValidator, { message: "{VALUE} already exists" });
const Product = mongoose.model("Product", productSchema);

module.exports = {
  Product,
};
