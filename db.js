const mongoose = require('mongoose');
require('dotenv').config();

// const mongoURL = 'mongodb://127.0.0.1:27017/hotel';
const mongoURL = process.env.DB_URL
// Create a connect function
async function connectDB() {
  try {
    await mongoose.connect(mongoURL);
    console.log('Connected to MongoDB!');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Optional: exit if DB connection fails
  }
}

const db = mongoose.connection;

module.exports = { connectDB, db };
