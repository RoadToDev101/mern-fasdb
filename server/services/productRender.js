const axios = require("axios");
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

// Render home page
exports.homeRoute = (req, res) => {
  // Make a get request to /api/products
  axios
    .get(`http://localhost:${PORT}/api/products`)
    .then(function (response) {
      // console.log(response);
      res.render("index", { products: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// Render add product page
exports.addProductRoute = (req, res) => {
  axios
    .get(`http://localhost:${PORT}/api/add-product`)
    .then(function (response) {
      // Destructure the response data to get the threadTypes, headTypes, driveTypes, pointTypes, shankTypes, coatings, materials and applications
      const {
        threadTypes,
        headTypes,
        driveTypes,
        pointTypes,
        shankTypes,
        coatings,
        materials,
        applications,
      } = response.data;
      //console.log(response.data);
      res.render("_addProduct", {
        threadTypes,
        headTypes,
        driveTypes,
        pointTypes,
        shankTypes,
        coatings,
        materials,
        applications,
      });
    })
    .catch((err) => {
      res.send(err);
    });
};

// Update a product
exports.updateProductRoute = (req, res) => {
  // Make a get request to /api/products
  axios
    .get(`http://localhost:${PORT}/api/products/${req.query.id}`)
    // Get the product with the id in the url
    .then(function (productData) {
      res.render("_updateProduct", { product: productData.data });
      //console.log(productData.data);
    })
    .catch((err) => {
      res.send(err);
    });
};

// Render show product page
exports.viewProductRoute = (req, res) => {
  // Make a get request to /api/products
  axios
    .get(`http://localhost:${PORT}/api/products/${req.query.id}`)
    // Get the product with the id in the url
    .then(function (productData) {
      res.render("_viewProduct", { product: productData.data });
      //console.log(productData.data);
    })
    .catch((err) => {
      res.send(err);
    });
};
