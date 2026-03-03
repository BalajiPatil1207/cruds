const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/userDB");

const STUD_MODEL = sequelize.define(
  "STUD_MODEL",
  {
    student_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    
    student_name: {
      type:DataTypes.STRING(100),
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Name are required"
        },
        len:{
          args:[3,100],
          msg:"Name must be 3 - 100 characters only"
        }
      }
    },

    S_class: {
      type:DataTypes.STRING(50),
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Class must be required"
        }
      }
    },

    age: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Age are required"
        }
      }
    }, 
    
    city: {
      type:DataTypes.STRING(100),
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"City are required"
        },
        len:{
          args:[3,100],
          msg:"City must be 3-100 charcters only"
        }
      }
    }
  },
  {
    tableName:"student",
    timestamps:true
  }
);

STUD_MODEL.sync()

module.exports = STUD_MODEL;