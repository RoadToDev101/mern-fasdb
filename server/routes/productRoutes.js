const express = require("express");
const router = express.Router();
const checkPermission = require("../utils/checkPermission.js");
const productController = require("../controllers/productController.js");

router.post(
  "/create-product",
  checkPermission,
  productController.createProduct
);
router.get("/get-all-products", productController.getAllProducts);
router.patch(
  "/update-product/:id",
  checkPermission,
  productController.updateProduct
);
router.delete(
  "/delete-product/:id",
  checkPermission,
  productController.deleteProduct
);

module.exports = router;
