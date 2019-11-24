const userModel = require("../model/user");
const tokenUtils = require("../utils/token")
//1.引入加密模块
const crypto = require('crypto');
const userRegister = async (req, res) => {
    let {
        username,
        password
    } = req.body;
    let findData = await userModel.userFind({
        username
    })
    if (findData) {
        res.json({
            code: 200,
            errMsg: "",
            data: {
                info: "用户名已存在",
                status: 2
            }
        })
    } else {
        //2.创建加密算法
        const hash = crypto.createHash('sha256');
        //3.加密数据
        hash.update(password);
        //用户状态
        let status = true;
        let registerTime = new Date().getTime();
        //用户昵称
        let name = Math.random().toString(36).substr(2, 8);
        //用户头像
        let userPic = "http://img.zcool.cn/community/01d1865543ec5b0000019ae91b12c1.jpg@1280w_1l_2o_100sh.jpg"
        let saveData = await userModel.userSave({
            userPic,
            username,
            password: hash.digest('hex'),
            status,
            registerTime,
            name,
        });
        if (saveData) {
            res.json({
                code: 200,
                errMsg: "",
                data: {
                    info: "注册成功",
                    status: 1
                }
            })
        }
    }
}
const userLogin = async (req, res) => {
    let {
        username,
        password
    } = req.body;
    let findData = await userModel.userFind({
        username
    });
    if (findData) {
        if (findData.status) {
            const hash = crypto.createHash('sha256');
            hash.update(password);
            if (findData.password == hash.digest('hex')) {
                let token = tokenUtils.sendToken({
                    username
                });
                //发生一个cookie给客户端
                res.cookie("token", token);

                res.json({
                    code: 200,
                    errMsg: "",
                    data: {
                        data:findData,
                        info: "登陆成功",
                        status: 1
                    }
                })
            } else {
                res.json({
                    code: 200,
                    errMsg: "",
                    data: {
                        info: "密码错误",
                        status: 2
                    }
                })
            }
        } else {
            res.json({
                code: 200,
                errMsg: "",
                data: {
                    info: "账号异常",
                    status: 3
                }
            })
        }
    } else {
        res.json({
            code: 200,
            errMsg: "",
            data: {
                info: "用户名称不存在",
                status: 0
            }
        })
    }

}
// const userRegister=(req,res)=>{
//     let{username,password}=req.body;
//     userModel.userFind({username},(result)=>{
//         if(result){
//             res.json({
//                 code:200,
//                 errMsg:"",
//                 data:{
//                     info:"用户名已存在",
//                     status:2
//                 }
//             })
//         }else{
//             userModel.userSave({username,password},()=>{
//                 res.json({
//                     code:200,
//                     errMsg:"",
//                     data:{
//                         info:"注册成功",
//                         status:1
//                     }
//                 })
//             })
//         }
//     })
// }
module.exports = {
    userRegister,
    userLogin

}