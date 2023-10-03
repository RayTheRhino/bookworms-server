const mongoose = require('mongoose');
require('dotenv').config();1

// MongoDB connection URL
const  mongoURL = process.env.MONGO_URI;
class Database {
  constructor() {
    this.client = mongoose.connect(mongoURL);
  }

  async connect() {
    try {
      await mongoose.connect(mongoURL);
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Failed to connect to MongoDB:', err);
    }
  }

  close() {
    this.client.close().then(() => {
      console.log('MongoDB connection closed');
    });
  }
}

module.exports = new Database();
