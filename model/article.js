const mongoose=require("../utils/database");

const Article=mongoose.model("article",{
    articleTitle:String,
        content:String
})
const articleSave=(articleInfo)=>{
    let article=new Article(articleInfo);
    return article.save();
}
const articlePage=(page,limit)=>{
    page=Number(page);
    limit=Number(limit);
    return Article.find().skip((page-1)*limit).limit(limit);
}
const articleFind=(id)=>{
    return Article.findOne({_id:id});
}
 module.exports={
     articleSave,
     articlePage,
     articleFind
 }