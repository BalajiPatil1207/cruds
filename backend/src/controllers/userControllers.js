const errorHandler = require("../helper/errorHandler");
const USER_MODEL = require("../models/userModel");

const userDetails = async (req, res) => {
  try {
    const users = await USER_MODEL.findAll();
    return res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(500).json({
      success: false,
      error: errors.message
    });
  };
};

const userFind = async (req, res) => {
  try {
    const user = await USER_MODEL.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found !"
      });
    };
    return res.status(200).json({
      success: true,
      data: user
    })
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(500).json({
      success: false,
      error: errors.message
    });
  };
};

const userStore = async (req, res) => {
  try {
    const user = await USER_MODEL.create(req.body);
    return res.status(201).json({
      success:true,
      data:user
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(500).json({
      success: false,
      error: errors.message
    });
  };
};

const userUpdate = async (req, res) => {
  try {
    const user = await USER_MODEL.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({
        success:false,
        message:"User Not found !"
      });
    }
    await user.update(req.body);
    return res.status(200).json({
      success:true,
      message:"User updated successfully"
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(500).json({
      success: false,
      error: errors.message
    });
  };
};

const userDelete = async (req, res) => {
  try {
    const user = await USER_MODEL.findByPk(req.params.id);
    if (!user) {
        return res.status(404).json({
          success:false,
          message:"User Not found !"
        });
      }
      await user.destroy();
      return res.status(200).json({
        success:true,
        message:"User delete successfully"
      });
    } catch (error) {
      const errors = errorHandler(error);
      return res.status(500).json({
        success: false,
        error: errors.message
      });
    };
};

module.exports = {
  userDetails,
  userFind,
  userUpdate,
  userStore,
  userDelete,
};