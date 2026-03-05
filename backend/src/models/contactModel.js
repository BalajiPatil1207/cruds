const { DataTypes } = require("sequelize");
const sequelize = require("../config/userDB");

const CONTACT_MODEL = sequelize.define(
  "CONTACT_MODEL",
  {
    contact_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name is required",
        },
      },
    },

    phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Phone number is required",
        },
      },
    },

    email: {
      type: DataTypes.STRING(120),
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Invalid email address",
        },
      },
    },

    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "contacts",
    timestamps: true,
  }
);

CONTACT_MODEL.sync();

module.exports = CONTACT_MODEL;