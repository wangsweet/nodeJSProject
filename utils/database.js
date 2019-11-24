const mongoose=require("mongoose");
const db_path="mongodb://127.0.0.1:27017/bk1917";
mongoose.connect(db_path);
module.exports=mongoose;