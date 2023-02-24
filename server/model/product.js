const mongoose = require("mongoose");

const threadTypeSchema = new mongoose.Schema({
  threadTypeName: {
    type: String,
    required: true,
    unique: true,
  },
});

const headTypeSchema = new mongoose.Schema({
  headTypeName: {
    type: String,
    required: true,
    unique: true,
  },
});

const driveTypeSchema = new mongoose.Schema({
  driveTypeName: {
    type: String,
    required: true,
    unique: true,
  },
});

const pointTypeSchema = new mongoose.Schema({
  pointTypeName: {
    type: String,
    required: true,
    unique: true,
  },
});

const shankTypeSchema = new mongoose.Schema({
  shankTypeName: {
    type: String,
    required: true,
    unique: true,
  },
});

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
        unique: true,
      },
    },
  ],
  threadType: [
    {
      threadTypeId: {
        type: mongoose.Types.ObjectId,
        ref: "ThreadType",
        unique: true,
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

const skuSchema = new mongoose.Schema({
  skuCode: {
    type: String,
    unique: true,
    required: true,
  },
  packagingQuantity: {
    type: Number,
  },
  isCollated: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const commercialDimensionSchema = new mongoose.Schema({
  overallLength: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
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

const applicationSchema = new mongoose.Schema({
  applicationName: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
});

const coatingSchema = new mongoose.Schema({
  coatingName: {
    type: String,
    unique: true,
    required: true,
  },
});

const materialSchema = new mongoose.Schema({
  materialName: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
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
    unique: true,
    required: true,
  },
  features: featureSchema,
  commercialDimensions: commercialDimensionSchema,
  materialId: {
    type: mongoose.Types.ObjectId,
    ref: "Material",
    required: true,
  },
  coatings: [
    {
      coatingId: {
        type: mongoose.Types.ObjectId,
        ref: "Coating",
        required: true,
      },
      layer: {
        type: Number,
        unique: true,
        required: true,
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

const productSchema = new mongoose.Schema({
  productType: {
    type: String,
    required: true,
  },
  modelName: {
    type: String,
    required: true,
    unique: true,
  },
  company: {
    type: String,
    required: true,
  },
  models: [modelSchema],
  productionDrawingID: [
    {
      type: mongoose.Types.ObjectId,
      ref: "ProductionDrawing",
      required: true,
    },
  ],
  codeReports: [codeReportSchema],
  applicationID: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Application",
      required: true,
    },
  ],
});

const Product = mongoose.model("Product", productSchema);

const ThreadType = mongoose.model("ThreadType", threadTypeSchema);
const HeadType = mongoose.model("HeadType", headTypeSchema);
const DriveType = mongoose.model("DriveType", driveTypeSchema);
const PointType = mongoose.model("PointType", pointTypeSchema);
const ShankType = mongoose.model("ShankType", shankTypeSchema);

const ProductionDrawing = mongoose.model(
  "ProductionDrawing",
  productionDrawingSchema
);

const Coating = mongoose.model("Coating", coatingSchema);
const Material = mongoose.model("Material", materialSchema);
const Application = mongoose.model("Application", applicationSchema);

module.exports = {
  Product,
  ProductionDrawing,
  ThreadType,
  HeadType,
  DriveType,
  PointType,
  ShankType,
  Material,
  Coating,
  Application,
};
