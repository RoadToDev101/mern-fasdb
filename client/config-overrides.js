const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
  alias({
    "@": "src",
    "@components": "src/components",
    "@data": "src/data",
    "@wrappers": "src/assets/wrappers",
    "@context": "src/context",
    "@utils": "src/utils",
    "@crud-utils": "src/features/crud-product/utils",
  })(config);

  return config;
};
