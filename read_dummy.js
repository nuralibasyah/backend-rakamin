const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();

// 👇️ configure CORS
app.use(cors());
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

app.post('/saldo/update', (req, res) => {
    try {
      // Get the amount to update from the request body
      const { amount } = req.body;
  
      // Validate input
      if (typeof amount !== 'number') {
        return res.status(400).json({ error: 'Invalid input data' });
      }
  
      // Update saldo value
      saldoData.saldo += amount;
  
      // Write updated saldo data to file
      fs.writeFileSync('dataSaldo.json', JSON.stringify(saldoData, null, 2));
  
      // Send response
      res.json({ message: 'Saldo updated successfully', newSaldo: saldoData.saldo });
    } catch (error) {
      console.error('Error updating saldo:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
