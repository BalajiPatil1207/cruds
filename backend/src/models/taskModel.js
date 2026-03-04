const { DataTypes } = require("sequelize");
const sequelize = require("../config/userDB");

const TASK_MODEL = sequelize.define(
  "TASK_MODEL",
  {
    task_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    task_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Task name is required",
        },
      },
    },

    priority: {
      type: DataTypes.ENUM("Low", "Medium", "High"),
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("Pending", "In Progress", "Completed"),
      allowNull: false,
    },

    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    tableName: "tasks",
    timestamps: true,
  }
);

TASK_MODEL.sync();

module.exports = TASK_MODEL;