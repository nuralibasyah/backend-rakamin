const express = require('express');
const { connectToDatabase } = require('./db'); // Assuming db.js is in the same directory
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Connect to MongoDB before starting the server
connectToDatabase().then(() => {
    // Start the server
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(err => {
    console.error('Failed to connect to the database:', err);
});
