const multer=require("multer");
//文件存储位置
var storage=multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    //设置文件的唯一名称
    filename: function (req, file, cb) {
        cb(null, Date.now()+"-"+file.originalname )
    }  
})
//使用配置
var upload = multer({ storage: storage })
var cpUpload=upload.fields([{
    name:"booksLogo",maxCount:1
}])
module.exports=cpUpload;