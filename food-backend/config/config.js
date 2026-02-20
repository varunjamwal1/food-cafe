// config.js
require("dotenv").config();

const config = Object.freeze({
  port: process.env.PORT || 3000,
  databaseURI: process.env.MONGO_DB || "mongodb://127.0.0.1:27017/defaultDB",
  nodeEnv: process.env.NODE_ENV || "development",
  accessTokenSecret: process.env.JWT_SECRET || "supersecretjwt",
  accessTokenExpire: "1d"
});

module.exports = config;
