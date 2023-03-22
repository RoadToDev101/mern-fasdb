const mongoose = require("mongoose");
// const { ProductionDrawing, CodeReport } = require("./file.js");
const {
  ThreadType,
  ShankType,
  HeadType,
  PointType,
  DriveType,
} = require("./feature");
const { Material, Coating } = require("./material-coatings");
const { Application } = require("./application");
const { User } = require("./user");

const featureSchema = new mongoose.Schema({
  headType: {
    headTypeId: {
      type: mongoose.Types.ObjectId,
      ref: "HeadType",
    },
  },
  driveType: {
    driveTypeId: {
      type: mongoose.Types.ObjectId,
      ref: "DriveType",
    },
  },
  pointType: {
    pointTypeId: {
      type: mongoose.Types.ObjectId,
      ref: "PointType",
    },
  },
  shankType: [
    {
      shankTypeId: {
        type: mongoose.Types.ObjectId,
        ref: "ShankType",
        unique: [true, "Shank type must be unique"],
      },
    },
  ],
  threadType: [
    {
      threadTypeId: {
        type: mongoose.Types.ObjectId,
        ref: "ThreadType",
        unique: [true, "Thread type must be unique"],
      },
      topThreadAngle: {
        type: Number,
      },
      bottomThreadAngle: {
        type: Number,
      },
    },
  ],
});

const skuSchema = new mongoose.Schema({
  skuCode: {
    type: String,
    unique: [true, "SKU code must be unique"],
    required: [true, "SKU code is required"],
  },
  packagingQuantity: {
    type: Number,
  },
  isCollated: {
    type: Boolean,
    default: false,
  },
});

const commercialDimensionSchema = new mongoose.Schema({
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
});

const mechanicalPropertiesSchema = new mongoose.Schema({
  yieldStrength: {
    type: String,
  },
  tensionStrength: {
    type: String,
  },
  shearStrength: {
    type: String,
  },
  torsionalStrength: {
    type: String,
  },
  coreHardness: {
    type: String,
  },
  surfaceHardness: {
    type: String,
  },
});

const loadTypeSchema = new mongoose.Schema({
  lowerLoad: {
    type: Number,
  },
  upperLoad: {
    type: Number,
  },
});

const wtwWithdrawalLoadSchema = new mongoose.Schema({
  minEmbedmentThreadLength: {
    type: Number,
  },
  load: loadTypeSchema,
});

const wtwShearLoadSchema = new mongoose.Schema({
  woodSideMemberThickness: {
    type: Number,
  },
  load: loadTypeSchema,
});

const stwShearLoadSchema = new mongoose.Schema({
  steelThickness: {
    type: Number,
  },
  load: loadTypeSchema,
});

const allowableLoadSchema = new mongoose.Schema({
  woodToWood: {
    withdrawal: [wtwWithdrawalLoadSchema],
    shear: [wtwShearLoadSchema],
  },
  steelToWood: {
    shear: [stwShearLoadSchema],
  },
});

const modelSchema = new mongoose.Schema({
  modelNumber: {
    type: String,
    unique: [true, "Model number already exists"],
    required: [true, "Please provide model number"],
  },
  features: featureSchema,
  commercialDimensions: commercialDimensionSchema,
  materialId: {
    type: mongoose.Types.ObjectId,
    ref: "Material",
    required: [true, "Please provide material"],
  },
  coatings: [
    {
      coatingId: {
        type: mongoose.Types.ObjectId,
        ref: "Coating",
        required: [true, "Please provide coating"],
      },
      layer: {
        type: Number,
        unique: [true, "Layer already exists"],
        required: [true, "Please provide layer"],
      },
      thickness: {
        type: Number,
      },
    },
  ],
  SKUs: [skuSchema],
  mechanicalProperties: mechanicalPropertiesSchema,
  screwAllowableLoads: allowableLoadSchema,
});

const productSchema = new mongoose.Schema(
  {
    productType: {
      type: String,
      enum: ["Screw", "Nail", "Anchor", "Other"],
      required: [true, "Please provide product type"],
      default: "Screw",
    },
    modelName: {
      type: String,
      required: [true, "Please provide model name"],
      unique: [true, "Model name already exists"],
    },
    company: {
      type: String,
      enum: ["Simpson Strong-Tie", "Hilti", "DeWalt", "Other"],
      required: [true, "Please provide company name"],
      default: "Simpson Strong-Tie",
    },
    models: [modelSchema],
    // productionDrawingID: [
    //   {
    //     type: mongoose.Types.ObjectId,
    //     ref: "ProductionDrawing",
    //   },
    // ],
    // codeReports: [
    //   {
    //     type: mongoose.Types.ObjectId,
    //     ref: "CodeReport",
    //   },
    // ],
    applicationID: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Application",
      },
    ],
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = {
  Product,
};
