const { DataTypes } = require("sequelize");
const sequelize = require("../config/userDB");

const INCOME_MODEL = sequelize.define(
  "INCOME_MODEL",
  {
    income_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    source: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Income source is required",
        },
      },
    },

    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Amount is required",
        },
        isDecimal: {
          msg: "Amount must be a valid number",
        },
        min: {
          args: [0],
          msg: "Amount cannot be negative",
        },
      },
    },

    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: {
        isDate: {
          msg: "Please provide a valid date",
        },
      },
    },

    note: {
      type: DataTypes.TEXT,
      allowNull: true, // Notes are usually optional
    },
  },
  {
    tableName: "income_table",
    timestamps: true,
  }
);

INCOME_MODEL.sync();

module.exports = INCOME_MODEL;