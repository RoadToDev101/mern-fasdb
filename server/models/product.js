const mongoose = require("mongoose");
const validator = require("validator");
const uniqueValidator = require("mongoose-unique-validator");
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
  coatings: [
    {
      coating: {
        type: String,
        enum: enumValues.coating,
      },
      layer: {
        type: Number,
        required: [true, "Please provide layer"],
      },
      thickness: {
        type: Number,
      },
    },
  ],
  corrosionResistance: {
    type: String,
    enum: ["N/a", "Low", "Medium", "High", "Severe"],
    default: "N/a",
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
    shankTypes: [
      {
        shankType: {
          type: String,
          enum: enumValues.shankType,
        },
      },
    ],
    threadTypes: [
      {
        threadType: {
          type: String,
          enum: enumValues.threadType,
        },
        topThreadAngle: {
          type: Number,
        },
        bottomThreadAngle: {
          type: Number,
        },
      },
    ],
  },
  SKU: [
    {
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
    },
  ],
  mechanicalProperty: {
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
  screwAllowableLoad: {
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
    productionDrawingID: [
      {
        type: mongoose.Types.ObjectId,
        ref: "ProductionDrawing",
      },
    ],
    urls: [
      {
        url: {
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

/*
 * corrosionResistanceAssign - a function that auto assign the corrosion resistance for each model in an array
 *
 * @param next: a function to be called after the function finishes its processing
 *
 * This function takes an array of model objects and assign the corrosion resistance for each model
 * based on its material and coatings properties. The resulting corrosion resistance value is assigned to
 * the model's 'corrosionResistance' property.
 *
 * The function also uses two lookup objects, 'materialLookup' and 'coatingLookup', to store the objects
 * from the 'enumData.material' and 'enumData.coating' arrays respectively, indexed by their 'value' property.
 * This allows for constant-time lookups of these objects when processing each model in the loop.
 *
 * The function avoids unnecessary iterations by checking for 'corrosionResistanceLevel' values and empty coatings
 * arrays before iterating over them.
 */
async function corrosionResistanceAssign(next) {
  const models = this.models || this.getUpdate().models;
  const isUpdating = this.models ? false : true;

  if (!models || models.length === 0) {
    console.log("No models found");
    return next();
  }

  const materialLookup = enumData.material.reduce((acc, obj) => {
    acc[obj.value] = obj;
    return acc;
  }, {});
  const coatingLookup = enumData.coating.reduce((acc, obj) => {
    acc[obj.value] = obj;
    return acc;
  }, {});

  for (let i = 0; i < models.length; i++) {
    const model = models[i];
    const material = model.material;
    const coatings = model.coatings;
    // console.log(material);
    // console.log(coatings);
    // console.log(model.corrosionResistance);
    // console.log(isUpdating);

    if (model.corrosionResistance !== "N/a" && isUpdating == false) continue;

    let corrosionResistanceLevel = "N/a";

    const materialObj = materialLookup[material];

    if (
      coatings.length === 0 &&
      materialObj &&
      materialObj.corrosionResistanceLevel
    ) {
      corrosionResistanceLevel = materialObj.corrosionResistanceLevel;
    } else {
      for (let j = 0; j < coatings.length; j++) {
        const coatingValue = coatings[j].coating;
        const coatingObj = coatingLookup[coatingValue];
        if (coatingObj && coatingObj.corrosionResistanceLevel) {
          corrosionResistanceLevel = coatingObj.corrosionResistanceLevel;
          break;
        }
      }
      if (
        corrosionResistanceLevel === "N/a" &&
        materialObj &&
        materialObj.corrosionResistanceLevel
      ) {
        corrosionResistanceLevel = materialObj.corrosionResistanceLevel;
      }
    }
    // console.log(corrosionResistanceLevel);
    model.corrosionResistance = corrosionResistanceLevel;
  }

  await next();
}

productSchema.pre(
  "save",
  corrosionResistanceAssign,
  uniqueArray("application"),
  uniqueArray("urls.url")
);

productSchema.pre(
  "findOneAndUpdate",
  corrosionResistanceAssign,
  uniqueArray("application"),
  uniqueArray("urls.url")
);

const Product = mongoose.model("Product", productSchema);

module.exports = {
  Product,
};
