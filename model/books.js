const mongoose=require("../utils/database");
const Books=mongoose.model("book",{
    booksAuth:String,
    booksName:String,
    booksStatus:String,
    booksPrice:Number,
    booksLogo:String
})
const booksSave=(booksInfo)=>{
    let books=new Books(booksInfo);
    return books.save();
}
const booksPage=(page,limit)=>{
    page=Number(page);
    limit=Number(limit);
    return Books.find().skip((page-1)*limit).limit(limit);
}
const booksUpdate=(id,booksInfo)=>{
    return Books.update({_id:id},booksInfo);
}
const BooksDelete=(id)=>{
    return Books.remove({_id:id});
}

const BooksFuzzySearch=(value)=>{
    var reg = new RegExp(value,'i');
    return Books.find({booksName:{$regex : reg}});
}

const BooksSort=(number)=>{
    number=Number(number);
    return Books.find().sort({booksPrice:number})
}
module.exports={
    booksSave,
    booksPage,
    booksUpdate,
    BooksDelete,
    BooksFuzzySearch,
    BooksSort
}