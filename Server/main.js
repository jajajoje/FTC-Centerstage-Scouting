const dotenv = require('dotenv').config({ debug: true });
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const sql_lib = require('mysql')

console.log(process.env.PORT)

const app = express();
const port = process.env.PORT || 3000;
const sql = sql_lib.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    waitForConnections: true
})

class Team {
  constructor(teamNumber, teamName, humanComm, humanPreferences, notes, preferredSide, autoPixels, teamProp, autoDelay, autoRoute, telePixels, mosaics, drone, suspend) {
    // General properties
    this.teamNumber = teamNumber; // integer <= 5 digits
    this.teamName = teamName; //string can be quite long upwards of 30 chars
    this.humanComm = humanComm; //integer
    this.humanPreferences = humanPreferences; //boolean
    this.notes = notes; //medium text

    // Auto properties
    this.preferredSide = preferredSide; //boolean
    this.autoPixels = autoPixels; //integer
    this.teamProp = teamProp; // boolean
    this.autoDelay = autoDelay; //boolean
    this.autoRoute = autoRoute; //image, preferably blox datatype

    // Teleop properties
    this.telePixels = telePixels; //integer 8 chars
    this.mosaics = mosaics; //integer

    // Endgame properties
    this.drone = drone; //boolean
    this.suspend = suspend; //boolean
  }
}

const exampleTeam = new Team(
  12345, // teamNumber
  "Example Team 2", // teamName
  5, // humanComm
  true, // humanPreferences
  "Example notes for the team", // notes
  true, // preferredSide
  100, // autoPixels
  false, // teamProp
  true, // autoDelay
  "example-route.jpg", // autoRoute
  200, // telePixels
  3, // mosaics
  false, // drone
  true // suspend
);

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

function updateTeam(tableId, team, connection, callback) {
  const { teamNumber, teamName, humanComm, humanPreferences, notes, preferredSide, autoPixels, teamProp, autoDelay, autoRoute, telePixels, mosaics, drone, suspend } = team;

  connection.query('INSERT INTO scouting_sheet_' + tableId + ' (teamNumber, teamName, humanComm, humanPreferences, notes, preferredSide, autoPixels, teamProp, autoDelay, autoRoute, telePixels, mosaics, drone, suspend) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE teamName = VALUES(teamName), humanComm = VALUES(humanComm), humanPreferences = VALUES(humanPreferences), notes = VALUES(notes), preferredSide = VALUES(preferredSide), autoPixels = VALUES(autoPixels), teamProp = VALUES(teamProp), autoDelay = VALUES(autoDelay), autoRoute = VALUES(autoRoute), telePixels = VALUES(telePixels), mosaics = VALUES(mosaics), drone = VALUES(drone), suspend = VALUES(suspend)', 
  [teamNumber, teamName, humanComm, humanPreferences, notes, preferredSide, autoPixels, teamProp, autoDelay, autoRoute, telePixels, mosaics, drone, suspend], (queryError, results) => {
      if (queryError) {
          callback(queryError, null);
          return;
      }
      callback(null, true);
  });
}

function testCallback(queryError, result) {
  if (queryError) {
      console.error('Error', queryError)
      return
  } else {
      console.log("successful")
      return
  }
}

// app.get("/verify", (req,res) =>{
//   res.sendStatus()
// })

updateTeam(111111,exampleTeam,sql,testCallback)