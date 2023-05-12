const express = require("express");
const router = express.Router();
const authorization = require("../middleware/authorization.js");
const productController = require("../controllers/productController.js");

router.post("/create-product", productController.createProduct);
router.get("/get-all-products", productController.getAllProducts);
router.patch(
  "/update-product/:id",

  productController.updateProduct
);
router.delete(
  "/delete-product/:id",

  productController.deleteProduct
);

module.exports = router;
