const { DataTypes } = require("sequelize");
const sequelize = require("../config/userDB");

const EXPENSE_MODEL = sequelize.define(
  "EXPENSE_MODEL",
  {
    expense_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Title is required" },
      },
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      validate: {
        notNull: { msg: "Amount is required" },
        min: { args: [0], msg: "Amount cannot be negative" },
      },
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Category is required" },
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "expense_table",
    timestamps: true,
  }
);

EXPENSE_MODEL.sync();
module.exports = EXPENSE_MODEL;