const {Router} = require("express")
const { getAllBooks, getOneBook, addBook, updateBook, deleteBook, search } = require("../controller/book.controller")
const bookValidateMiddleware = require("../middlewares/book.validate.middleware")


const BookRouter = Router()

BookRouter.get("/get_all_books", getAllBooks)
BookRouter.get("/get_one_book/:id", getOneBook)
BookRouter.get("/book_search", search)
BookRouter.post("/add_book", bookValidateMiddleware, addBook)
BookRouter.put("/update_book/:id", updateBook)
BookRouter.delete("/delete_book/:id", deleteBook)

module.exports = BookRouter