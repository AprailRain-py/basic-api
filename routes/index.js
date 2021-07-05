const express = require("express");
const router = express.Router();
const mainController = require("../controller");

router.put("/hello", mainController.helloFn);

router.get("/hello", mainController.wishBirthDay);

module.exports = router;
