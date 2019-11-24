const express = require("express");
const router = express.Router();
const booksController = require("../controller/books");
const authUtils = require("../utils/token")

router.post("/addbooks", booksController.AddBooks);

router.get("/booksList",authUtils.tokenVerfiy,booksController.BooksList);

router.post("/modify",booksController.BooksModify);

router.get("/delete",booksController.BooksDelete);

router.get("/booksSearch",authUtils.tokenVerfiy,booksController.BooksSearch);

router.get("/booksSort",authUtils.tokenVerfiy,booksController.BooksSort);

module.exports = router;