const express = require("express");
const router = express.Router();
const booksController = require("../controller/userMess");
const authUtils = require("../utils/token")

router.get("/userMess",authUtils.tokenVerfiy,booksController.UserMess);

module.exports = router;