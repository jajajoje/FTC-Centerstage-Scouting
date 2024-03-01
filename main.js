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

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});

app.use("/", express.static('Client'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
    this.autoRoute = autoRoute; // Array, list of Point objects

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
  [], // autoRoute
  200, // telePixels
  3, // mosaics
  false, // drone
  true // suspend
);

// Use the cors middleware to allow cross-origin requests remove for hosting?
// Define a route that returns JSON data
app.get('/data', (req, res) => {
  const responseData = { 
  message: 'Hello from the server!' };
  res.json(responseData);
});

app.get('/codeCreate', (req, res) => {
  sql.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err)
      res.status(500).send('Internal Server Error')
      return
    }

    // Get all join codes
    connection.query('SELECT joinCode FROM scoutingSheet', (queryError, results) => {
      if (queryError) {
        res.status(500).send('Internal Server Error ')
        return
      }

      const joinCodes = results.map(row => row['joinCode'])


      // Epic one liner for 6 digit alphanumeric code generator
      // No AI was used in the creation of this code
      let code

      do {
        code = Array(6).fill(0).map((_, i) => [
          Math.floor(Math.random() * 10),
          String.fromCharCode(Math.floor(Math.random() * (0x5B - 0x41)) + 0x41),
          String.fromCharCode(Math.floor(Math.random() * (0x7B - 0x61)) + 0x61)
        ][Math.floor(Math.random() * 3)]).toString().replaceAll(",", "")
      } while(joinCodes.find(joinCode => joinCode === code))

      connection.query(`INSERT INTO scoutingSheet (joinCode, teamsList) VALUES (?, ?)`, [code, '[]'], (queryError, results) => {
        connection.release()

        if (queryError) {
          res.status(500).send('Internal Server Error 3')
          return
        }

        res.set({
          'Content-Type': 'application/json'
        })
  
        res.send({
          joinCode: code
        })
      })
    })
  })
})

app.post('/join', (req, res) => {
  sql.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err)
      res.status(500).send('Internal Server Error')
      return
    }
    
    connection.query('SELECT teamsList FROM scoutingSheet WHERE joinCode = ?', [req.body.joinCode], (queryError, results) => {
      connection.release()

      if (queryError) {
        res.status(500).send('Internal Server Error')
        return
      }
      else if(results.length === 0) {
        res.status(400).send('Invalid Code')
        return
      }

      res.json({ teamsList: JSON.parse(results[0].teamsList) })
    })
  })
})

app.post('/setTList', (req, res) => {
  data = req.body
  sql.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err)
      res.status(500).send('Internal Server Error')
      return
    }
    console.log(req.body.joinCode)
    connection.query('UPDATE scoutingSheet SET teamsList = ? WHERE joinCode = ?', [req.body.teamsList, req.body.joinCode], (queryError, results) => {
      connection.release()
      if (queryError) {
        //console.log(queryError)
        res.status(500).send('Internal Server Error')
        return
      }
      res.status(200).send('Success')
    })
  })
})


// Start the Express.js server

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

