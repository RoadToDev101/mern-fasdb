const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController.js");

router.post("/create-product", productController.createProduct);
router.get("/get-all-products", productController.getAllProducts);

module.exports = router;
