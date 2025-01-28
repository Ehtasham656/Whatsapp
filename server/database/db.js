const mongoose = require("mongoose");
require("dotenv").config();
const Connection = async () => {
  const URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.xak4t.mongodb.net/whatsapp?retryWrites=true&w=majority&appName=Cluster0`;
  try {
    await mongoose.connect(URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = Connection;
