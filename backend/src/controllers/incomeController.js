const errorHandler = require("../helper/errorHandler");
const INCOME_MODEL = require("../models/incomeModel");

const allIncome = async (req, res) => {
  try {
    const incomes = await INCOME_MODEL.findAll();
    return res.status(200).json({
      success: true,
      data: incomes
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(500).json({
      success: false,
      error: errors.message
    });
  }
};

const findIncome = async (req, res) => {
  try {
    const income = await INCOME_MODEL.findByPk(req.params.id);
    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income record not found!",
      });
    }
    return res.status(200).json({
      success: true,
      data: income
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(500).json({
      success: false,
      error: errors.message
    });
  }
};

const createIncome = async (req, res) => {
  try {
    const income = await INCOME_MODEL.create(req.body);
    return res.status(201).json({
      success: true,
      data: income
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(500).json({
      success: false,
      error: errors.message
    });
  }
};

const updateIncome = async (req, res) => {
  try {
    const income = await INCOME_MODEL.findByPk(req.params.id);
    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income record not found!",
      });
    }
    await income.update(req.body);
    return res.status(200).json({
      success: true,
      data: "Income record updated successfully",
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(500).json({
      success: false,
      error: errors.message
    });
  }
};

const deleteIncome = async (req, res) => {
  try {
    const income = await INCOME_MODEL.findByPk(req.params.id);
    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income record not found!",
      });
    }
    await income.destroy();
    return res.status(200).json({
      success: true,
      data: "Income record deleted successfully",
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
  allIncome,
  findIncome,
  createIncome,
  updateIncome,
  deleteIncome,
};