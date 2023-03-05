const loginController = require("../controller/loginController");
const express = require("express");
const router = express.Router();

router.post("/login", loginController.login);
router.get("/refresh", loginController.loginRefresh);
router.post("/logout", loginController.logout);

module.exports = router;
