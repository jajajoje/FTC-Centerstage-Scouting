require('dotenv').config()
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const sql_lib = require('mysql')

const app = express();
const port = process.env.PORT || 3000;
const sql = sql_lib.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    waitForConnections: true
})

// Use the cors middleware to allow cross-origin requests remove for hosting?
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