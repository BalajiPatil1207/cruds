const errorHandler = require("../helper/errorHandler");
const PROD_MODEL = require("../models/productModel");

const allProduct = async (req, res) => {
  try {
    const products = await PROD_MODEL.findAll();
    return res.status(200).json({
      success: true,
      data: products
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(500).json({
      success: false,
      error: errors.message
    });;
  };
};

const findProduct = async (req, res) => {
  try {
    const product = await PROD_MODEL.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found !",
      });
    };
    return res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(500).json({
      success: false,
      error: errors.message
    });
  };
};

const createProduct = async (req, res) => {
  try {
    const product = await PROD_MODEL.create(req.body);
    return res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(500).json({
      success: false,
      error: errors.message
    });
  };
};

const updateProduct = async (req, res) => {
  try {
    const product = await PROD_MODEL.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found !",
      });
    };
    await product.update(req.body);
    return res.status(200).json({
      success: true,
      data: "product updated successfully",
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(500).json({
      success: false,
      error: errors.message
    });;
  };
};

const deleteProduct = async (req, res) => {
  try {
    const product = await PROD_MODEL.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found !",
      });
    };
    await product.destroy();
    return res.status(200).json({
      success: true,
      data: "product delete successfully",
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(500).json({
      success: false,
      error: errors.message
    });;
  };
};

module.exports = {
  allProduct,
  findProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};