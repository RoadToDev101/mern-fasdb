const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController.js");
const requestLogger = require("../middleware/requestLogger");

router.post("/create-product", productController.createProduct, requestLogger);
router.post("/create-model", productController.createModel, requestLogger);
router.post("/create-sku", productController.createSKU, requestLogger);
router.get("/get-all-products", productController.getAllProducts);
router.get("/compare-models", productController.compareModels);
router.patch(
  "/update-product/:id",
  productController.updateProduct,
  requestLogger
);
router.patch("/update-model/:id", productController.updateModel, requestLogger);
router.patch("/update-sku/:id", productController.updateSKU, requestLogger);
router.delete(
  "/delete-product/:id",
  productController.deleteProduct,
  requestLogger
);
router.delete(
  "/delete-model/:id",
  productController.deleteModel,
  requestLogger
);
router.delete("/delete-sku/:id", productController.deleteSKU, requestLogger);

module.exports = router;
