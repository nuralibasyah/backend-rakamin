const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.get('/saldo', (req, res) => {
    res.send("100000");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
