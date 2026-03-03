const { DataTypes } = require("sequelize");
const sequelize = require("../config/userDB");

const PROD_MODEL = sequelize.define(
  "PROD_MODEL",
  {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    product_name:{
      type:DataTypes.STRING(100),
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Product name is required",
        },
      },
    },

    price:{
      type:DataTypes.DECIMAL(10,2),
      allowNull:false,
      validate:{
        notNull:{
          msg:"Price is required"
        },
        isDecimal:{
          msg:"Price must be a valid number"
        },
        min:{
          args:[0],
          msg:"Price can not be negative"
        }
      },
    },

    quantity:{
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          msg:"Quantity are required"
        },
        isInt:{
          msg:"Quantity must be valide number"
        },
        min:{
          args:[1],
          msg:"Quantity must be at least 1"
        }
      }
    },

    description:{
      type:DataTypes.TEXT,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Description is required"
        }
      }
    }
  },
  {
    tableName:"product_table",
    timestamps:true,
  }
);

PROD_MODEL.sync();

module.exports=PROD_MODEL;