const mongoose = require("mongoose");
const enumData = require("../../client/src/data/index");

const getEnumValues = (enums) => {
  return enums.reduce((acc, cur) => {
    acc[cur] = enumData[cur].map((item) => item.value);
    return acc;
  }, {});
};

const enums = [
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

const modelSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: [true, "Please provide product"],
    },
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
    feature: {
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
        type: mongoose.Types.ObjectId,
        ref: "SKU",
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

/*
 * corrosionResistanceAssign - a function that auto assign the corrosion resistance for each model in an array
 *
 * @param next: a function to be called after the function finishes its processing
 *
 * This function will be unavailable if the 'corrosionResistance' property is present in the request body.
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
  const materialLookup = enumData.material.reduce((acc, obj) => {
    acc[obj.value] = obj;
    return acc;
  }, {});
  const coatingLookup = enumData.coating.reduce((acc, obj) => {
    acc[obj.value] = obj;
    return acc;
  }, {});

  let material = this.material;
  let coatings = this.coatings;
  let corrosionResistance = this.corrosionResistance;
  let isUpdating = !this.isNew;
  if (isUpdating) {
    const update = this.getUpdate();
    if (update.material) {
      material = update.material;
    }
    if (update.coatings) {
      coatings = update.coatings;
    }
    if (update.corrosionResistance) {
      corrosionResistance = update.corrosionResistance;
    }
  }

  if (corrosionResistance !== "N/a" && isUpdating == false) {
    // Skip execution if 'corrosionResistance' property exists
    await next();
    return;
  }

  let corrosionResistanceLevel = "N/a";

  const materialObj = materialLookup[material];
  // console.log("materialObj: ", materialObj);
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
      // console.log("coatingObj: ", coatingObj);
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
  // console.log("corrosionResistanceLevel: ", corrosionResistanceLevel);
  this.set("corrosionResistance", corrosionResistanceLevel);

  await next();
}

modelSchema.path("coatings").validate(function (coatings) {
  const coatingLayerPairs = coatings.map((coating) => ({
    coating: coating.coating,
    layer: coating.layer,
  }));

  const duplicates = coatingLayerPairs.filter(
    (pair, index) =>
      coatingLayerPairs.findIndex(
        (p) => p.coating === pair.coating && p.layer === pair.layer
      ) !== index
  );

  return duplicates.length === 0;
}, "Coating and layer combination must be unique within the model.");

modelSchema.pre("save", corrosionResistanceAssign);

modelSchema.pre("findOneAndUpdate", corrosionResistanceAssign);

const Model = mongoose.model("Model", modelSchema);

module.exports = { Model };
