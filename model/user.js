const mongoose=require("../utils/database")
// const User=mongoose.model("user",{
//     username:String,
//     password:String
// })
const User=mongoose.model("user",{
    userPic:String,
    username:String,
    password:String,
    name:String,
    registerTime:Number,
    status:Boolean,
    
})
// const userFind=(userInfo,callback)=>{
//     User.findOne(userInfo).then((data)=>{
//         callback(data);
//     })
// }
const userFind=(userInfo)=>{
    return User.findOne(userInfo)
}
// const  userSave=(userInfo,callback)=>{
//     let user=new User(userInfo);
//     user.save().then(()=>{
//         callback();
//     })
// }
const  userSave=(userInfo)=>{
    let user=new User(userInfo);
    return user.save();
}

const usermessPage=(page,limit)=>{
    page=Number(page);
    limit=Number(limit);
    return User.find().skip((page-1)*limit).limit(limit);
}

module.exports={
    userFind,
    userSave,
    usermessPage
}
