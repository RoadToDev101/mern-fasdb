const express = require("express");
const router = express.Router();

othersController = require("../controllers/othersController.js");

//Get features
router.get("/thread-types", othersController.getThreadTypes);
router.get("/head-types", othersController.getHeadTypes);
router.get("/drive-types", othersController.getDriveTypes);
router.get("/point-types", othersController.getPointTypes);
router.get("/shank-types", othersController.getShankTypes);
router.get("/get-all-features", othersController.getAllFeatureTypes);

//Get applications
router.get("/get-applications", othersController.getApplications);
module.exports = router;
