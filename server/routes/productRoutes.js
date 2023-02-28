const express = require("express");
const router = express.Router();
const services = require("../services/productRender.js");

const productController = require("../controllers/productController.js");
/**
 *@description Root Route
 * @method GET /
 */
router.get("/", services.homeRoute);

/**
 *@description add products route
 * @method GET /
 */
router.get("/add-product", services.addProductRoute);

/**
 * @description update products route
 * @method GET /update-product
 */
router.get("/update-product", services.updateProductRoute);

/**
 * @description show a product route
 * @method GET /show-product
 */
router.get("/view-product", services.viewProductRoute);

router.post("/api/products", productController.create);
router.get("/api/products", productController.findAll);
router.get("/api/products/:id", productController.findOne);
router.put("/api/products/:id", productController.updateByID);
router.delete("/api/products/:id", productController.delete);

router.get("/api/add-product", productController.findAllProductComponents);
module.exports = router;
