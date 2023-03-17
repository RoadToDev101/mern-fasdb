const express = require("express");
const router = express.Router();
const services = require("../services/productRender.js");

const productController = require("../controllers/productController.js");

router.get("/all-product", productController.findAll);
router.post("/create-product", productController.create);
router.get("/get-product/:id", productController.findOne);
router.patch("/update-product/:id", productController.updateByID);
router.delete("/delete-product/:id", productController.delete);

module.exports = router;
