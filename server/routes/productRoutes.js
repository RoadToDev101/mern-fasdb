const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController.js");
const requestLogger = require("../middleware/requestLogger");

router.post("/create-product", productController.createProduct, requestLogger);
router.get("/get-all-products", productController.getAllProducts);
router.get("/compare-models", productController.compareModels);
router.patch(
  "/update-product/:id",
  productController.updateProduct,
  requestLogger
);
router.delete(
  "/delete-product/:id",
  productController.deleteProduct,
  requestLogger
);

module.exports = router;
