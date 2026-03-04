const errorHandler = require("../helper/errorHandler");
const TASK_MODEL = require("../models/taskModel");

const taskDetails = async (req, res) => {
  try {
    const tasks = await TASK_MODEL.findAll();

    return res.status(200).json({
      success: true,
      data: tasks,
    });

  } catch (error) {
    const errors = errorHandler(error);

    return res.status(500).json({
      success: false,
      error: errors.message,
    });
  }
};

const taskFind = async (req, res) => {
  try {

    const task = await TASK_MODEL.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found!",
      });
    }

    return res.status(200).json({
      success: true,
      data: task,
    });

  } catch (error) {
    const errors = errorHandler(error);

    return res.status(500).json({
      success: false,
      error: errors.message,
    });
  }
};

const taskStore = async (req, res) => {
  try {

    const task = await TASK_MODEL.create(req.body);

    return res.status(201).json({
      success: true,
      data: task,
    });

  } catch (error) {
    const errors = errorHandler(error);

    return res.status(500).json({
      success: false,
      error: errors.message,
    });
  }
};

const taskUpdate = async (req, res) => {
  try {

    const task = await TASK_MODEL.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found!",
      });
    }

    await task.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
    });

  } catch (error) {
    const errors = errorHandler(error);

    return res.status(500).json({
      success: false,
      error: errors.message,
    });
  }
};

const taskDelete = async (req, res) => {
  try {

    const task = await TASK_MODEL.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found!",
      });
    }

    await task.destroy();

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });

  } catch (error) {
    const errors = errorHandler(error);

    return res.status(500).json({
      success: false,
      error: errors.message,
    });
  }
};

module.exports = {
  taskDetails,
  taskFind,
  taskStore,
  taskUpdate,
  taskDelete,
};