const usermessModel = require("../model/user");

const UserMess = async (req, res) => {
    let {
        page,
        limit
    } = req.query;
    let data = await usermessModel.usermessPage(page, limit);
    if (data.length > 0) {
        res.json({
            code: 200,
            errMsg: "",
            data: {
                list: data,
                status: 1
            }
        })
    } else {
        res.json({
            code: 200,
            errMsg: "",
            data: {
                list: [],
                status: 0
            }
        })
    }
}

module.exports={
    UserMess
}