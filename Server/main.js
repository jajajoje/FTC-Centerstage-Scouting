const express = require('express');
const sql = require('mssql');
const cors = require('cors'); // Import the cors middleware remove for hosting?

const app = express();
const port = 5501; // Use port 5501 for the Express.js server

// Use the cors middleware to allow cross-origin requests remove for hosting?
app.use(cors());

// Define a route that returns JSON data
app.get('/data', (req, res) => {
  const responseData = { message: 'Hello from the server!' };
  res.json(responseData);
});

// Start the Express.js server
app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});

const config = {
  server: 'localhost',
  database: 'YourDatabaseName',
  user: 'YourUsername',
  password: 'YourPassword',
  options: {
      encrypt: false // For Windows users, set to true if using Express.js to connect to SQL Server
  }
};

sql.connect(config)
  .then(pool => {
      console.log('Connected to SQL Server');

      // Perform database operations here

      sql.close();
  })
  .catch(err => {
      console.error('Error connecting to SQL Server:', err);
  });