const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Endpoint to get saldo
app.get('/saldo', (req, res) => {
  // Read the JSON file
  fs.readFile('dataSaldo.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    try {
      // Parse JSON data
      const jsonData = JSON.parse(data);
      // Get the value of saldo
      const saldo = jsonData.saldo;
      // Send saldo in response
      res.json({ saldo });
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
