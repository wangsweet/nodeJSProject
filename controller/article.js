const articleModel = require("../model/article");
const ArticlePush = async (req, res) => {
    let {
        articleTitle,
        content
    } = req.body;
    let data = await articleModel.articleSave({
        articleTitle,
        content
    })
    if (data) {
        res.json({
            code: 200,
            errMsg: "",
            data: {
                info: "发布成功",
                status: 1
            }
        })
    } else {
        res.json({
            code: 200,
            errMsg: "",
            data: {
                info: "发布失败",
                status: 0
            }
        })
    }
}
const ArticleList=async(req,res)=>{
    let{ page,limit}=req.query;
    let data=await articleModel.articlePage(page,limit);
    if(data.length>0){
        res.json({
            code:200,
            errMsg:"",
            data:{
                list:data,
                status:1
            }
        })
    }else{
        res.json({
            code:200,
            errMsg:"",
            data:{
                list:[],
                status:0
            }
        })
    }
}

const ArticleContent=async (req,res)=>{
    let {id}=req.query;
    let data=await articleModel.articleFind(id);
    if(data){
        res.json({
            code:200,
            errMsg:"",
            data:{data}
        })
    }else{
        res.json({
            code:200,
            errMsg:"",
            data:{
                data:"",
                info:"没有找到数据"}
        })
    }
}
module.exports={
    ArticlePush,
    ArticleList,
    ArticleContent
}