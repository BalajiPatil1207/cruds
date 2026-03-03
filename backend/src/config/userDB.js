const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect:'sqlite',
  storage:'./userDB.sqlite',
  logging:false,
  
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database Connected");
  } catch (error) {
    console.log("not connected");
  }
};

connectDB();

module.exports = sequelize;
