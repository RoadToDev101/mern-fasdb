const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
// const { ProductionDrawing, CodeReport } = require("./file.js");
const uniqueArray = require("../middleware/uniqueArray");
const enumData = require("../../client/src/data/index");
const getEnumValues = (enums) => {
  return enums.reduce((acc, cur) => {
    acc[cur] = enumData[cur].map((item) => item.value);
    return acc;
  }, {});
};

const enums = [
  "application",
  "driveType",
  "headType",
  "pointType",
  "shankType",
  "threadType",
  "coating",
  "material",
];

const enumValues = getEnumValues(enums);

const fastenerLoadTypeSchema = new mongoose.Schema({
  lowerLoad: {
    type: Number,
  },
  upperLoad: {
    type: Number,
  },
});

const modelSchema = new mongoose.Schema({
  modelNumber: {
    type: String,
    unique: true,
    required: [true, "Please provide model number"],
  },
  material: {
    type: String,
    enum: enumValues.material,
    required: [true, "Please provide material"],
  },
  corrosionResistance: {
    type: String,
    enum: ["None", "Low", "Medium", "High", "Severe"],
    default: "None",
  },
  features: {
    headType: {
      type: String,
      enum: enumValues.headType,
    },
    driveType: {
      type: String,
      enum: enumValues.driveType,
    },
    pointType: {
      type: String,
      enum: enumValues.pointType,
    },
    shankType: [
      {
        type: String,
        enum: enumValues.shankType,
      },
    ],
    threadType: [
      {
        type: String,
        enum: enumValues.threadType,
        topThreadAngle: {
          type: Number,
        },
        bottomThreadAngle: {
          type: Number,
        },
      },
    ],
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
  coatings: [
    {
      type: String,
      enum: enumValues.coating,
      layer: {
        type: Number,
        required: [true, "Please provide layer"],
      },
      thickness: {
        type: Number,
      },
    },
  ],
  SKUs: [
    {
      skuCode: {
        type: String,
        unique: [true, "SKU code must be unique"],
        required: [true, "SKU code is required"],
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
    },
  ],
  mechanicalProperties: {
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
  },
  screwAllowableLoads: {
    woodToWood: {
      withdrawal: [
        {
          minEmbedmentThreadLength: {
            type: Number,
          },
          load: fastenerLoadTypeSchema,
        },
      ],
      shear: [
        {
          woodSideMemberThickness: {
            type: Number,
          },
          load: fastenerLoadTypeSchema,
        },
      ],
    },
    steelToWood: {
      shear: [
        {
          steelThickness: {
            type: Number,
          },
          load: fastenerLoadTypeSchema,
        },
      ],
    },
  },
});

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
    models: [modelSchema],
    // productionDrawingID: [
    //   {
    //     type: mongoose.Types.ObjectId,
    //     ref: "ProductionDrawing",
    //   },
    // ],
    codeReports: [
      {
        type: String,
      },
    ],
    application: [
      {
        type: String,
        enum: enumValues.application,
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

productSchema.plugin(uniqueValidator);
modelSchema.plugin(uniqueValidator);
productSchema.pre(
  "save",
  uniqueArray("application"),
  uniqueArray("codeReports")
);

const Product = mongoose.model("Product", productSchema);

module.exports = {
  Product,
};
