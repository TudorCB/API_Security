const mongoose = require('mongoose');

async function connectDB() {
  try {
    //@TO DO fix process env
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase", { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
}

module.exports = connectDB;

connectDB()