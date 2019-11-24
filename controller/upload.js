const cpUpload = require("../utils/upload");

const ImageUpload = (req,res) => {
    cpUpload(req,res,(err)=>{
        if(err){
            res.json({
                code:200,
                errMsg:"",
                data:{
                    urlImage:"http://img2.imgtn.bdimg.com/it/u=2581204526,1641464124&fm=26&gp=0.jpg",
                    info:"服务器错误"
                }
            })
        }else{
            let urlPath = "http://localhost:3000/images/"+req.files.booksLogo[0].filename;
            res.json({
                code:200,
                errMsg:"",
                data:{
                    urlImg:urlPath
                }
            })
        }
    })
}


module.exports = {
    ImageUpload
}