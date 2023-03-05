const express = require("express");
const router = express.Router();
const leadController = require("../controller/leadController");

router.post("/create", leadController.createLead);
router.get("/getAll", leadController.getAllLeads);
router.get("/getById/:id", leadController.getLeadById);
router.get("/getLeadByAgentId/:id", leadController.getLeadByAgentId);
router.put("/update", leadController.updateLead);
router.delete("/delete/:id", leadController.deleteLead);

module.exports = router;
