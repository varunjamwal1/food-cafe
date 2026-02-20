const mongoose = require('mongoose');
const config =require("./config")
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.databaseURI); // no options needed
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // exit the process on failure
  }
};

module.exports = connectDB;
