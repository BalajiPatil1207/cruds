const errorHandler = (error) => {

  console.log(error);

  if (error.name === "SequelizeValidationError") {
    return {
      message: error.errors.map(err => err.message)
    };
  } else if (error.name === "SequelizeUniqueConstraintError") {
    return {
      message: error.errors.map(err => err.message)
    }
  } else if (error.name === "SequelizeDatabaseError") {
    return {
      message: "Database error occured"
    }
  } else {
    return {
      message: error.message || "Internal server Error"
    }
  }
};

module.exports = errorHandler;