const booksModel = require("../model/books");
const AddBooks = async (req, res) => {
    let {
        booksAuth,
        booksName,
        booksStatus,
        booksPrice,
        booksLogo
    } = req.body;
    let booksData = await booksModel.booksSave({
        booksAuth,
        booksName,
        booksStatus,
        booksPrice,
        booksLogo
    })
    if (booksData) {
        res.json({
            code: 200,
            errMsg: "",
            data: {
                info: "添加成功",
                status: 1
            }
        })
    } else {
        res.json({
            code: 200,
            errMsg: "",
            data: {
                info: "服务器错误",
                status: 0
            }
        })
    }
}
const BooksList = async (req, res) => {
    let {
        page,
        limit
    } = req.query;
    let data = await booksModel.booksPage(page, limit);
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
const BooksModify = async (req, res) => {
    let {
        booksAuth,
        booksName,
        booksStatus,
        booksPrice,
        booksLogo,
        id
    } = req.body;
    let data = await booksModel.booksUpdate(id, {
        booksAuth,
        booksName,
        booksStatus,
        booksPrice,
        booksLogo
    });
    if (data.ok == 1) {
        res.json({
            code: 200,
            errMsg: "",
            data: {
                info: "修改成功",
                status: 1
            }
        })
    } else {
        res.json({
            code: 200,
            errMsg: "",
            data: {
                info: "修改失败",
                status: 0
            }
        })
    }
}
const BooksDelete=async (req,res)=>{
    let {id}=req.query;
    let data=await booksModel.BooksDelete(id);
    if(data.ok==1){
        res.json({
            code:200,
            errMsg:"",
            data:{
                info:"删除成功",
                status:1
            }
        })
    }else{
        res.json({
            code:200,
            errMsg:"",
            data:{
                info:"删除失败",
                status:0
            }
        })
    }
}

const BooksSearch=async (req,res)=>{
    let{value}=req.query;
    let data=await booksModel.BooksFuzzySearch(value);
    if (data.length>0) {
        res.json({
            code: 200,
            errMsg: "",
            data: {
                list: data,
                status: 1
            }
        })
    }else{
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

const BooksSort=async (req,res)=>{
    let{number}=req.query;
    let data=await booksModel.BooksSort(number);
    if (data.length>0) {
        res.json({
            code: 200,
            errMsg: "",
            data: {
                list: data,
                status: 1
            }
        })
    }else{
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
module.exports = {
    AddBooks,
    BooksList,
    BooksModify,
    BooksDelete,
    BooksSearch,
    BooksSort
}