const errorHandler = require("../helper/errorHandler");
const STUD_MODEL = require("../models/studModel");

const studIndex = async (req, res) => {
  try {
    const studs = await STUD_MODEL.findAll();
    console.log("Student", studs);
    return res.status(200).json({
      success: true,
      data: studs
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(500).json({
      success: false,
      error: errors.message
    });;
  };
};

const studFind = async (req, res) => {
  try {
    const stud = await STUD_MODEL.findByPk(req.params.id);
    if (!stud) {
      return res.status(404).json({
        success: false,
        message: "Student not found !",
      });
    };
    return res.status(200).json({
      success: true,
      data: stud
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(500).json({
      success: false,
      error: errors.message
    });
  };
};

const studStore = async (req, res) => {
  try {
    const stud = await STUD_MODEL.create(req.body);
    return res.status(201).json({
      success: true,
      data: stud
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(500).json({
      success: false,
      error: errors.message
    });
  };
};

const studUpdate = async (req, res) => {
  try {
    const stud = await STUD_MODEL.findByPk(req.params.id);
    if (!stud) {
      return res.status(404).json({
        success: false,
        message: "Student not found !",
      });
    };
    await stud.update(req.body);
    return res.status(200).json({
      success: true,
      data: "Student updated successfully",
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(500).json({
      success: false,
      error: errors.message
    });;
  };
};

const studDelete = async (req, res) => {
  try {
    const stud = await STUD_MODEL.findByPk(req.params.id);
    if (!stud) {
      return res.status(404).json({
        success: false,
        message: "Student not found !",
      });
    };
    await stud.destroy();
    return res.status(200).json({
      success: true,
      data: "Student delete successfully",
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
  studIndex,
  studFind,
  studStore,
  studUpdate,
  studDelete,
};