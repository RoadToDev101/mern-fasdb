const mongoose = require("mongoose");
const validator = require("validator");
const uniqueArray = require("../middleware/uniqueArray");
const application = require("../../client/src/data/application");

const applicationEnum = application.map((item) => item.value);

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
    model: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Model",
      },
    ],
    productionDrawingID: [
      {
        type: mongoose.Types.ObjectId,
        ref: "ProductionDrawing",
      },
    ],
    url: [
      {
        hyperlink: {
          type: String,
          validate: {
            validator: function (v) {
              return validator.isURL(v);
            },
            message: "Invalid URL",
          },
        },
        metadata: {
          type: Object,
          required: false,
        },
      },
    ],
    application: [
      {
        type: String,
        enum: applicationEnum,
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

productSchema.pre(
  "save",
  uniqueArray("application"),
  uniqueArray("url.hyperlink")
);

productSchema.pre(
  "findOneAndUpdate",
  uniqueArray("application"),
  uniqueArray("url.hyperlink")
);

const Product = mongoose.model("Product", productSchema);

module.exports = {
  Product,
};
