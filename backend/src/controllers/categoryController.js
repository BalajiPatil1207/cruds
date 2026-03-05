const errorHandler = require("../helper/errorHandler");
const CATEGORY_MODEL = require("../models/categoryModel");

const categoryDetails = async(req,res)=>{
  try{

    const categories = await CATEGORY_MODEL.findAll();

    return res.status(200).json({
      success:true,
      data:categories
    });

  }catch(error){

    const errors = errorHandler(error);

    return res.status(500).json({
      success:false,
      error:errors.message
    });
  }
};

const categoryFind = async(req,res)=>{
  try{

    const category = await CATEGORY_MODEL.findByPk(req.params.id);

    if(!category){
      return res.status(404).json({
        success:false,
        message:"Category not found"
      });
    }

    return res.status(200).json({
      success:true,
      data:category
    });

  }catch(error){

    const errors = errorHandler(error);

    return res.status(500).json({
      success:false,
      error:errors.message
    });
  }
};

const categoryStore = async(req,res)=>{
  try{

    const category = await CATEGORY_MODEL.create(req.body);

    return res.status(201).json({
      success:true,
      data:category
    });

  }catch(error){

    const errors = errorHandler(error);

    return res.status(500).json({
      success:false,
      error:errors.message
    });
  }
};

const categoryUpdate = async(req,res)=>{
  try{

    const category = await CATEGORY_MODEL.findByPk(req.params.id);

    if(!category){
      return res.status(404).json({
        success:false,
        message:"Category not found"
      });
    }

    await category.update(req.body);

    return res.status(200).json({
      success:true,
      message:"Category updated"
    });

  }catch(error){

    const errors = errorHandler(error);

    return res.status(500).json({
      success:false,
      error:errors.message
    });
  }
};

const categoryDelete = async(req,res)=>{
  try{

    const category = await CATEGORY_MODEL.findByPk(req.params.id);

    if(!category){
      return res.status(404).json({
        success:false,
        message:"Category not found"
      });
    }

    await category.destroy();

    return res.status(200).json({
      success:true,
      message:"Category deleted"
    });

  }catch(error){

    const errors = errorHandler(error);

    return res.status(500).json({
      success:false,
      error:errors.message
    });
  }
};

module.exports={
  categoryDetails,
  categoryFind,
  categoryStore,
  categoryUpdate,
  categoryDelete
};