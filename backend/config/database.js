const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

// MongoDB native client instance
let dbInstance = null;
let client = null;

const connectDB = async () => {
  try {
    // Connect with Mongoose (for models)
    await mongoose.connect(process.env.MONGO_URL, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    console.log('Mongoose connected to MongoDB');

    // Connect with native MongoDB client (for direct queries)
    client = new MongoClient(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    await client.connect();
    dbInstance = client.db(); // Get the database instance
    console.log('Native MongoDB client connected');
    
    return dbInstance;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const getDbInstance = () => {
  if (!dbInstance) {
    throw new Error('Database not connected. Call connectDB() first.');
  }
  return dbInstance;
};

module.exports = {
  connectDB,
  getDbInstance
};
