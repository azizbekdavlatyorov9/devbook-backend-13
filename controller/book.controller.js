const BookSchema = require("../schema/book.schema");
const CustomErrorHandler = require("../error/error");

const getAllBooks = async (req, res, next) => {
  try {
    const books = await BookSchema.find()
    .populate(
      "author_info",
      "-_id -createdAt -updatedAt -__v",
    )
    .populate(
      "Quote",
      
    )


    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};
const search = async (req, res, next) => {
  try {
    const { searchingvalue } = req.query;
    const books = await BookSchema.find({
      title: { $regex: searchingvalue, $options: "i" },
    });

    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

const addBook = async (req, res, next) => {
  try {
    const {
      title,
      published_year,
      pages,
      publisher,
      period,
      genres,
      details,
      author_info,
    } = req.body;

    await BookSchema.create({
      title,
      published_year,
      pages,
      genres,
      details,
      publisher,
      period,
      author_info,
    });

    res.status(201).json({
      message: "Added new book",
    });
  } catch (error) {
    next(error);
  }
};

const getOneBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const foundedBook = await BookSchema.findById(id);

    if (!foundedBook) {
      throw CustomErrorHandler.NotFound("Book not found");
    }

    res.status(200).json(foundedBook);
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      published_year,
      pages,
      publisher,
      period,
      genres,
      details,
      author_info,
    } = req.body;

    const foundedBook = await BookSchema.findById(id);

    if (!foundedBook) {
      throw CustomErrorHandler.NotFound("Book not found");
    }

    await BookSchema.updateOne(
      { _id: id },
      {
        title,
        published_year,
        pages,
        genres,
        details,
        publisher,
        period,
        author_info,
      },
    );

    res.status(200).json({
      message: "Updated book",
    });
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const foundedBook = await BookSchema.findById(id);

    if (!foundedBook) {
      throw CustomErrorHandler.NotFound("Book not found");
    }

    await BookSchema.findByIdAndDelete({ _id: id });

    res.status(200).json({
      message: "Deleted book",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBooks,
  addBook,
  getOneBook,
  updateBook,
  deleteBook,
  search,
};
