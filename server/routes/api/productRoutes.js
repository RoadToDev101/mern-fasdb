const express = require("express");
const router = express.Router();
const productController = require("../../controllers/productController.js");
const requestLogger = require("../../middleware/logger.js");

router.post("/create-product", requestLogger, productController.createProduct);
router.post("/create-model", requestLogger, productController.createModel);
router.post("/create-sku", requestLogger, productController.createSKU);
router.get("/get-all-products", productController.getAllProducts);
router.get("/get-one-product/:id", productController.getOneProduct);
router.get("/compare-models", productController.compareModels);
router.patch(
  "/update-product/:id",
  requestLogger,
  productController.updateProduct
);
router.patch("/update-model/:id", requestLogger, productController.updateModel);
router.patch("/update-sku/:id", requestLogger, productController.updateSKU);
router.delete(
  "/delete-product/:id",
  requestLogger,
  productController.deleteProduct
);
router.delete(
  "/delete-model/:id",
  requestLogger,
  productController.deleteModel
);
router.delete("/delete-sku/:id", requestLogger, productController.deleteSKU);

module.exports = router;
