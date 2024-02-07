const { MongoClient } = require('mongodb');

// Connection URL
const url = "mongodb+srv://nuralibasyah:PpeqWhO99KFKF7yE@cluster0.ti7srot.mongodb.net/?retryWrites=true&w=majority"; // Assuming MongoDB is running locally

// Database Name
const dbName = 'Cluster0'; // Replace 'your_database_name' with your actual database name

let dbInstance;

async function connectToDatabase() {
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected successfully to MongoDB');
    dbInstance = client.db(dbName);
}

function getDatabase() {
    if (!dbInstance) {
        throw new Error('Database not initialized. Call connectToDatabase first.');
    }
    return dbInstance;
}

module.exports = {
    connectToDatabase,
    getDatabase
};