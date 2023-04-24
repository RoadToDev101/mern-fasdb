const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const loadTypeSchema = new mongoose.Schema({
  lowerLoad: {
    type: Number,
  },
  upperLoad: {
    type: Number,
  },
});

const skuSchema = new mongoose.Schema({
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
});

const modelSchema = new mongoose.Schema({
  modelNumber: {
    type: String,
    unique: true,
    required: [true, "Please provide model number"],
  },
  material: {
    type: String,
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
    },
    driveType: {
      type: String,
    },
    pointType: {
      type: String,
    },
    shankType: [
      {
        type: String,
        unique: true,
      },
    ],
    threadType: [
      {
        type: String,
        unique: true,
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
      unique: true,
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
          load: loadTypeSchema,
        },
      ],
      shear: [
        {
          woodSideMemberThickness: {
            type: Number,
          },
          load: loadTypeSchema,
        },
      ],
    },
    steelToWood: {
      shear: [
        {
          steelThickness: {
            type: Number,
          },
          load: loadTypeSchema,
        },
      ],
    },
  },
});

modelSchema.plugin(uniqueValidator, { message: "{VALUE} already exists" });

module.exports = mongoose.model("Model", modelSchema);
