const errorHandler = require("../helper/errorHandler");
const BOOK_MODEL = require("../models/bookModel");

const bookDetails = async (req, res) => {
  try {

    const books = await BOOK_MODEL.findAll();

    return res.status(200).json({
      success: true,
      data: books
    });

  } catch (error) {

    const errors = errorHandler(error);

    return res.status(500).json({
      success: false,
      error: errors.message
    });
  }
};


const bookFind = async (req, res) => {
  try {

    const book = await BOOK_MODEL.findByPk(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found!"
      });
    }

    return res.status(200).json({
      success: true,
      data: book
    });

  } catch (error) {

    const errors = errorHandler(error);

    return res.status(500).json({
      success: false,
      error: errors.message
    });
  }
};


const bookStore = async (req, res) => {
  try {

    const book = await BOOK_MODEL.create(req.body);

    return res.status(201).json({
      success: true,
      data: book
    });

  } catch (error) {

    const errors = errorHandler(error);

    return res.status(500).json({
      success: false,
      error: errors.message
    });
  }
};


const bookUpdate = async (req, res) => {
  try {

    const book = await BOOK_MODEL.findByPk(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found!"
      });
    }

    await book.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Book updated successfully"
    });

  } catch (error) {

    const errors = errorHandler(error);

    return res.status(500).json({
      success: false,
      error: errors.message
    });
  }
};


const bookDelete = async (req, res) => {
  try {

    const book = await BOOK_MODEL.findByPk(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found!"
      });
    }

    await book.destroy();

    return res.status(200).json({
      success: true,
      message: "Book deleted successfully"
    });

  } catch (error) {

    const errors = errorHandler(error);

    return res.status(500).json({
      success: false,
      error: errors.message
    });
  }
};


module.exports = {
  bookDetails,
  bookFind,
  bookStore,
  bookUpdate,
  bookDelete,
};