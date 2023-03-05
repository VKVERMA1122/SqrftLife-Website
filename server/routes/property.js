const express = require("express");
const router = express.Router();
const propertyController = require("../controller/propertyController");

router.post("/create", propertyController.createProperty);
router.get("/getAll", propertyController.getAllProperty);
router.get("/getById/:id", propertyController.getPropertyById);
// router.get("/getLeadByAgentId/:id", propertyController.getLeadByAgentId);
router.put("/update", propertyController.updateProperty);
router.delete("/delete/:id", propertyController.deleteProperty);

module.exports = router;
