const express = require('express');
const { connectToDatabase, getDatabase } = require('./db'); // Assuming db.js is in the same directory
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB before starting the server
connectToDatabase()
    .then(() => {
        // Routes
        app.get('/saldo', async (req, res) => {
            try {
                // Access the database
                const db = getDatabase();

                // Query the database to retrieve the saldo value
                const collection = db.collection('SaldoKu'); // Replace 'your_collection_name' with the actual name of your collection
                const document = await collection.findOne({ id: 0 });

                if (!document) {
                    res.status(404).send('Saldo not found');
                    return;
                }

                // Send the saldo value as a response
                res.json({ saldo: document.name });
            } catch (error) {
                console.error('Error fetching saldo:', error);
                res.status(500).send('Internal Server Error');
            }
        });

        // Start the server
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to the database:', err);
    });
