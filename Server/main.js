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

const Sequelize = require('sequelize');

// Initialize Sequelize with connection details
const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'mysql',
  host: 'your-database-host',
  port: '3306',
});

function(initializeSQL){

}