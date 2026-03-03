const { DataTypes } = require("sequelize");
const sequelize = require("../config/userDB");

const USER_MODEL = sequelize.define(
  "USER_MODEL", {
  user_ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Name is required"
      },
      len: {
        args: [3, 50],
        msg: "name must be allow 3 - 50 characters only"
      }
    }
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: { msg: "Email already exists" },
    set(value) {
      this.setDataValue("email", value.toLowerCase());
    },
    validate: {
      notEmpty: {
        msg: "Email is required"
      },
      isEmail: {
        msg: "Please enter valid email"
      },
    },
  },

  phone: {
    type: DataTypes.STRING(15),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Phone number is required"
      },
      isNumeric: {
        msg: "Phone must contain only numbers"
      },
      len: {
        args: [10, 15],
        msg: "Phone number must be between 10-15 digits"
      }
    },
    unique: {
      msg: "Phone number is already exists"
    }
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Password is requird"
      },
      len: {
        args: [6, 20],
        msg: "Password must be 6 characters"
      }
    }
  }
},
  {
    tableName: "user_Table",
    timestamps: true
  }
);

USER_MODEL.sync();

module.exports = USER_MODEL;