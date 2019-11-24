const express = require("express");
const router = express.Router();
const uploadController = require("../controller/upload")
//上传图片接口
router.post("/urlImg",uploadController.ImageUpload)


module.exports = router;