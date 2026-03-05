const { DataTypes } = require("sequelize");
const sequelize = require("../config/userDB");

const BOOK_MODEL = sequelize.define(
  "BOOK_MODEL",
  {
    book_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Title is required",
        },
      },
    },

    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Author name is required",
        },
      },
    },

    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Price is required",
        },
      },
    },

    publish_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Publish year is required",
        },
      },
    },
  },
  {
    tableName: "books",
    timestamps: true,
  }
);

module.exports = BOOK_MODEL;