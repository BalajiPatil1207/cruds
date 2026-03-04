const errorHandler = require("../helper/errorHandler");
const EMPLOYEE_MODEL = require("../models/empModel");

const allEmployee = async (req, res) => {
  try {
    const employees = await EMPLOYEE_MODEL.findAll();
    return res.status(200).json({
      success: true,
      data: employees
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(500).json({
      success: false,
      error: errors.message
    });
  }
};

const findEmployee = async (req, res) => {
  try {
    const employee = await EMPLOYEE_MODEL.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "employee not found !",
      });
    }
    return res.status(200).json({
      success: true,
      data: employee
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(500).json({
      success: false,
      error: errors.message
    });
  }
};

const createEmployee = async (req, res) => {
  try {
    const employee = await EMPLOYEE_MODEL.create(req.body);
    return res.status(201).json({
      success: true,
      data: employee
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(500).json({
      success: false,
      error: errors.message
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const employee = await EMPLOYEE_MODEL.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "employee not found !",
      });
    }
    await employee.update(req.body);
    return res.status(200).json({
      success: true,
      data: "employee updated successfully",
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(500).json({
      success: false,
      error: errors.message
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employee = await EMPLOYEE_MODEL.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "employee not found !",
      });
    }
    await employee.destroy();
    return res.status(200).json({
      success: true,
      data: "employee deleted successfully",
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
  allEmployee,
  findEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};