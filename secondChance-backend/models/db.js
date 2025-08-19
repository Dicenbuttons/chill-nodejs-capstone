// db.js
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

// MongoDB connection URL with authentication options
let url = `${process.env.MONGO_URL}`;

let dbInstance = null;
const dbName = `secondChance`;
let client = null;

async function connectToDatabase() {
    if (dbInstance){
        return dbInstance
    };

    try {
        // Create client if not already created
        if (!client) {
            client = new MongoClient(url);
        }
        
        await client.connect();
        dbInstance = client.db(dbName);
        console.log("Connected to MongoDB:", dbName);
        return dbInstance;

      } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err;
      }
}

module.exports = connectToDatabase;
