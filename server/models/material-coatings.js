const mongoose = require("mongoose");

const coatingSchema = new mongoose.Schema({
  coatingName: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
  },
});

const materialSchema = new mongoose.Schema({
  materialName: {
    type: String,
    required: true,
    unique: true,
    default: "Carbon Steel",
  },
  description: {
    type: String,
  },
});

const Coating = mongoose.model("Coating", coatingSchema);
const Material = mongoose.model("Material", materialSchema);

module.exports = {
  Material,
  Coating,
};
