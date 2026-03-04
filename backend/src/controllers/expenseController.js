const errorHandler = require("../helper/errorHandler");
const EXPENSE_MODEL = require("../models/expenseModel");

const allExpense = async (req, res) => {
  try {
    const expenses = await EXPENSE_MODEL.findAll();
    return res.status(200).json({ 
      success: true, data: expenses 
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(500).json({ 
      success: false, error: errors.message 
    });
  }
};

const createExpense = async (req, res) => {
  try {
    const expense = await EXPENSE_MODEL.create(req.body);
    return res.status(201).json({ 
      success: true, data: expense 
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(500).json({ 
      success: false, error: errors.message 
    });
  }
};

const findExpense = async (req, res) => {
  try {
    const expense = await EXPENSE_MODEL.findByPk(req.params.id);
    if (!expense) return res.status(404).json({ 
      success: false, message: "Not found" 
    });
    return res.status(200).json({ 
      success: true, data: expense 
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(500).json({ 
      success: false, error: errors.message 
    });
  }
};

const updateExpense = async (req, res) => {
  try {
    const expense = await EXPENSE_MODEL.findByPk(req.params.id);
    if (!expense) return res.status(404).json({ 
      success: false, message: "Not found" 
    });
    await expense.update(req.body);
    return res.status(200).json({ 
      success: true, data: "Updated successfully" 
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(500).json({ 
      success: false, error: errors.message 
    });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const expense = await EXPENSE_MODEL.findByPk(req.params.id);
    if (!expense) return res.status(404).json({ 
      success: false, message: "Not found" 
    });
    await expense.destroy();
    return res.status(200).json({ 
      success: true, data: "Deleted successfully" 
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(500).json({ 
      success: false, error: errors.message 
    });
  }
};

module.exports = { 
  allExpense, 
  createExpense, 
  findExpense, 
  updateExpense, 
  deleteExpense 
};