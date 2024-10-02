const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  }));

app.options('/api/update-json', cors());
// Handle POST request to update JSON
app.post('/api/update-json', (req, res) => {
  const { companyCode } = req.body;

  // Read the JSON file
  let data;
  try {
    data = JSON.parse(fs.readFileSync('variable_data.json', 'utf8'));
  } catch (error) {
    console.error('Error reading JSON file:', error);
    return res.status(500).send('Error reading JSON file');
  }

  // Update the company code
  data.company_code = companyCode;

  // Write the updated data back to the JSON file
  fs.writeFileSync('variable_data.json', JSON.stringify(data, null, 2));

  res.send('JSON file updated successfully');
});

// Handle GET request to root URL
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(3001, () => {
  console.log('Backend server is running on port 3001');
});
