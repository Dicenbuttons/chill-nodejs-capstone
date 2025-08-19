// db.js
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

// MongoDB connection URL with authentication options
let url = `${process.env.MONGO_URL}`;

let dbInstance = null;
const dbName = `${process.env.MONGO_DB}`;

async function connectToDatabase() {
    if (dbInstance){
        return dbInstance
    };

    try {
        // Task 2: Connect to MongoDB
        await client.connect();
    
        // Task 3: Connect to the secondChance database and store it in dbInstance
        dbInstance = client.db(dbName);
    
        console.log("✅ Connected to MongoDB:", dbName);
    
        // Task 4: Return dbInstance
        return dbInstance;
      } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err;
      }
}

module.exports = connectToDatabase;
