const mongoose = require("mongoose");

// Define a function to connect to the MongoDB database using the provided URL
const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log(">>> DB is connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
