//cookies (holds join code)
let userData = parseCookie()
//current team of interest
let currentSelector = null
//holds data related to teams scouting
let masterList = []
//hold the DOM objects for buttons
let buttonList = []

ftcJoinAsk()

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

/*
 *
 *           end of main varibles
 *
 */

//this will check for exisitng join code if not and run a function 
//the function scoutingJoin and scoutingCreate will await response
function ftcJoinAsk (){
    if(userData == undefined){
        console.log(true)
        document.getElementById("joinPopup").style.display = "block"
        document.getElementById("leaveButton").style.display = "none"
    }else{
        console.log(false)
        // uncoment for when it works
        // masterList = initializeScouting(userData[joinCode])
        //delete this soon
        masterList = json.stringify(testData)
        let testData = [
            {
              "teamNumber": 12345,
              "teamName": "Example Team 1",
              "humanComm": 3,
              "humanPreferences": true,
              "notes": "Example notes for Team 1",
              "preferredSide": true,
              "autoPixels": 1,
              "teamProp": false,
              "autoDelay": true,
              "autoRoute": "example-route1.jpg",
              "telePixels": 16,
              "mosaics": 3,
              "drone": false,
              "suspend": true
            },
            {
              "teamNumber": 54321,
              "teamName": "Example Team 2",
              "humanComm": 5,
              "humanPreferences": false,
              "notes": "Example notes for Team 2",
              "preferredSide": false,
              "autoPixels": 2,
              "teamProp": true,
              "autoDelay": false,
              "autoRoute": "example-route2.jpg",
              "telePixels": 20,
              "mosaics": 2,
              "drone": true,
              "suspend": false
            }
        ];
    }

    buttonPopulate()
    document.getElementById("leaveButton").style.display = "block"
}

//cookies for join code
function newCookie(code) {
    console.log("cookie created")
    userData = {
        joinCode: code
    }
    let jsonData = JSON.stringify(userData)
    document.cookie = `userData=${encodeURIComponent(jsonData)}; expires=Tue, 30 Dec 2024 12:00:00 UTC; path=/`
}

function updateCookie() {
    let jsonData = JSON.stringify(userData)
    document.cookie = `userData=${encodeURIComponent(jsonData)}; expires=Tue, 30 Dec 2024 12:00:00 UTC; path=/`
}

function parseCookie() {
    let cookies = document.cookie
    let cookieData = cookies
        .split("; ")
        .find((cookie) => cookie.startsWith("userData="))

    if (cookieData) {
        let jsonData = decodeURIComponent(cookieData.split("=")[1])
        let userData = JSON.parse(jsonData)
        return(userData)
    }
}

/*
 *
 *           end of autorun javascript
 *      anything below is not run on startup
 *              the exeptions are... 
 *
 *
 */
function draw(canvas) {
    
    // var ctx = canvas.getContext("2d");

    // canvas.addEventListener("mousedown", startDrawing);
    // canvas.addEventListener("mousemove", draw);
    // canvas.addEventListener("mouseup", stopDrawing);

    // var isDrawing = false;
    // var lastX = 0;
    // var lastY = 0;

    // function startDrawing(event) {
    //     isDrawing = true;
    //     [lastX, lastY] = [event.offsetX, event.offsetY];
    // }

    // function draw(event) {
    //     if (!isDrawing) return;
    //     ctx.beginPath();
    //     ctx.moveTo(lastX, lastY);
    //     ctx.lineTo(event.offsetX, event.offsetY);
    //     ctx.strokeStyle = "black";
    //     ctx.lineWidth = 2;
    //     ctx.stroke();
    //     [lastX, lastY] = [event.offsetX, event.offsetY];
    // }

    // function stopDrawing() {
    //     isDrawing = false;
    // }

    var ctx = canvas.getContext("2d")

    canvas.width = canvas.clientWidth; // Set canvas width to its CSS width
    canvas.height = canvas.clientHeight; // Set canvas height to its CSS height

    var isDrawing = false;

    canvas.addEventListener("mousedown", startDrawing)
    canvas.addEventListener("mousemove", draw)
    canvas.addEventListener("mouseup", stopDrawing)

    function startDrawing(event) {
        ctx.beginPath();
        isDrawing = true;
        draw(event); // Call draw initially to start drawing from the current position
    }

    function draw(event) {
        if (!isDrawing) return
        var x = event.offsetX
        var y = event.offsetY
        ctx.lineTo(x, y)
        ctx.strokeStyle = "black"
        ctx.lineWidth = 2
        ctx.stroke()
    }

    function stopDrawing() {
        isDrawing = false;
    }
}

function addScouting() {
    //add to the server then it will pull the data from the server
    let scoutPanel = document.getElementById("scoutingSheet")
    scoutPanel.style.display= "block"

}

function finishAddScouting(joinCode){
    //adds the scouted team to the server list and client list
    let scoutPanel = document.getElementById("scoutingSheet")
    scoutPanel.style.display= "none"
      // Extracting data from HTML
    var teamNumber = document.getElementById('teamNumber').value;
    var teamName = document.getElementById('teamName').textContent;
    var humanComm = document.querySelector('input[name="communication"]:checked').value;
    var humanPreferences = document.querySelector('input[name="humanPreferences"]:checked').value;
    var notes = document.querySelector('.text_area').value;
    var preferredSide = document.querySelector('input[name="preferredSide"]:checked').value === "1";
    var autoPixels = document.querySelector('.auto_sheet input[type="number"]').value;
    var teamProp = document.querySelector('input[name="teamProp"]:checked').value === "1";
    var autoDelay = document.querySelector('input[name="autoDelay"]:checked').value === "1";
    var autoRoute = document.querySelector('.draw_panel').toDataURL(); // Assuming autoRoute is stored as base64 image data
    var telePixels = document.querySelector('.tele_end_sheet input[type="number"]').value;
    var mosaics = document.querySelectorAll('.tele_end_sheet input[type="number"]')[1].value;
    var drone = document.querySelector('input[name="drone"]:checked').value === "1";
    var suspend = document.querySelector('input[name="suspend"]:checked').value === "1";

    // Creating a Team object
    var team = new Team(teamNumber, teamName, parseInt(humanComm), humanPreferences === "1", notes, preferredSide, parseInt(autoPixels), teamProp, autoDelay, autoRoute, parseInt(telePixels), parseInt(mosaics), drone, suspend);
    console.log(team)
    return team;
}

function removeScouting(currentSelector,joinCode){
//send the request to delete such data

}

function ftcLookup(){
    //ignore this. use for swagger.json
    //comunication to grab info from api through server

}

function ftcLookupName(){
    //ignore this. use for swagger.json
    let teamNumber= document.getElementById("teamNumber").value
    console.log(teamNumber)
}

function scoutingJoin(){
    document.getElementById("joinArea").style.display="block"
}

function scoutingJoinSubmit(){

}

function scoutingLeave() {
    userData = parseCookie()
    currentSelector = null
    masterList = []
    buttonList = []
    ftcJoinAsk()
}

function buttonPopulate(){
    // console.log(masterList)
    let buttonContainer = document.getElementById("buttonContainer")
    buttonList = []
    //create the buttons from the masterList
    for (let i = 0; i < masterList.length; i++) {
        let team = masterList[i];
        buttonList[i] = document.createElement("button");
        buttonList[i].textContent = `${team.teamNumber}: ${team.teamName}`;
        buttonContainer.appendChild(buttonList[i]);
    }
}

async function initializeScouting(joinCode)
{
    try {
        const response = await fetch(location.protocol + '//' + location.host + "/getTList", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({joinCode:joinCode})
        })

        if (response.status == 200) 
        {   
            const resultsJson = await response.json()
            console.log(resultsJson)
            return resultsJson
        }
        else 
        {    
            const errorData = await response.json()
            return false
        }
    } 
    catch(error) {
        console.error('Error list store')
        return false

    }
}

async function storeList(joinCode, teamsList)
{
    try {
        const response = await fetch(location.protocol + '//' + location.host + "/setTList", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({joinCode:joinCode,teamsList:teamsList})
        })
        return response.status === 200
    } 
    catch(error) {
        console.error('Error during list store')
        console.error(error)
        return false

    }
}

function scoutingGroupCreate() {
    //sends a request to create join code to the server
    fetch('/codeCreate', {
        method: 'GET',
        cache: "no-cache",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        if(res.ok)
            return res.json()
        throw new Error('Failed to create join code')
    })
    .then(data => {
        newCookie(data.joinCode)
        userData = parseCookie()
        document.getElementById("joinPopup").style.display = "none"
    })
    .catch(error => {
        console.error('Error:', error)
    })
}



// initializeScouting(111111)
//storeList(111111,masterList)
//scoutingGroupCreate()
// console.log(JSON.stringify(masterList))
