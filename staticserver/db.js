const mongoose = require("mongoose");
require("dotenv").config();

const mongodbUrl = `mongodb://${
  process.env.DB_HOST || "localhost:27017"
}/staticserver`;
//   process.env.DB_HOST || "mongodb://localhost:27017/staticserver";

const connectDB = async (options = {}) => {
  try {
    await mongoose.connect(mongodbUrl, options);
    console.log("Database connection established successfully of staticserver");

    mongoose.connection.on("error", (err) =>
      console.error("Database connection error: ", err)
    );
  } catch (error) {
    console.error("Could not connect to Database: ", error.toString());
    process.exit(1);
  }
};
module.exports = connectDB;