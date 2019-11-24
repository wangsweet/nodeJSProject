const express=require("express");
const router=express.Router();
const articleController=require("../controller/article");
const authUtils = require("../utils/token")

router.post("/articlePush",articleController.ArticlePush);

router.get("/articleList",authUtils.tokenVerfiy,articleController.ArticleList);

router.get("/content",authUtils.tokenVerfiy,articleController.ArticleContent);

module.exports=router;