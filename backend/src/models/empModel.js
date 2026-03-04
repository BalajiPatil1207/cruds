const { DataTypes } = require("sequelize");
const sequelize = require("../config/userDB");

const EMPLOYEE_MODEL = sequelize.define("EMPLOYEE_MODEL", {
  employee_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  designation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salary: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },
  joining_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  }
}, { tableName: "employees", timestamps: true });

EMPLOYEE_MODEL.sync();
module.exports = EMPLOYEE_MODEL;