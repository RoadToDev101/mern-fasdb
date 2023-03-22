const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController.js");

router.post("/create-product", productController.createProduct);

module.exports = router;
