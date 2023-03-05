const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");


router.post("/create", userController.createNewUser);
router.get("/getAll", userController.getAllUser);
router.get("/getById/:id", userController.getUserById);
router.put("/update", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);



module.exports = router;
