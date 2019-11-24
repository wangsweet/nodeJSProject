var express = require('express');
var router = express.Router();

const userController=require("../controller/user");

router.post("/register", userController.userRegister)
router.post("/login", userController.userLogin)


module.exports = router;
