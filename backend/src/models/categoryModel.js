const { DataTypes } = require("sequelize");
const sequelize = require("../config/userDB");

const CATEGORY_MODEL = sequelize.define(
  "CATEGORY_MODEL",
  {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    category_name: {
      type: DataTypes.STRING(120),
      allowNull:false,
      validate:{
        notEmpty:{ msg:"Category name required"}
      }
    },

    description:{
      type:DataTypes.TEXT
    },

    status:{
      type:DataTypes.ENUM("Active","Inactive"),
      allowNull:false
    }

  },
  {
    tableName:"categories",
    timestamps:true
  }
);

CATEGORY_MODEL.sync();

module.exports = CATEGORY_MODEL;