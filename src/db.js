const mongoose = require("mongoose");

// Define a function to connect to the MongoDB database using the provided URL
const connectDB = async (url) => {
  await mongoose.connect(url);
  console.log(">>> DB is connected");
};

module.exports = connectDB;
