const express = require("express");
const router = express.Router();

const featureController = require("../controllers/featureController.js");

router.get("/thread-types", featureController.getThreadTypes);
router.get("/head-types", featureController.getHeadTypes);
router.get("/drive-types", featureController.getDriveTypes);
router.get("/point-types", featureController.getPointTypes);
router.get("/shank-types", featureController.getShankTypes);
router.get("/get-all-features", featureController.getAllFeatureTypes);

module.exports = router;
