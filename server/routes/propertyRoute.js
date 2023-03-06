const express = require("express");
const router = express.Router();
const propertyController = require("../controller/propertyController");

router.post("/create", propertyController.createProperty);
router.get("/getAll", propertyController.getAllProperty);
router.get("/getById/:id", propertyController.getPropertyById);
router.get("/getLeadByPostedById/:id", propertyController.getLeadByPostedById);
router.put("/update", propertyController.updateProperty);
router.delete("/delete/:id", propertyController.deleteProperty);
router.get("/getUnverifiedProperty", propertyController.getUnverifiedProperty);
router.get("/getVerifiedProperty", propertyController.getVerifiedProperty);

module.exports = router;
