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
async function ftcJoinAsk() {
    if(userData == undefined || userData.joinCode == undefined || userData.joinCode == 0){
        document.getElementById("joinPopup").style.display = "block"
        document.getElementById("leaveButton").style.display = "none"
    }
    else{
        transition()
        setCodeLabel(userData.joinCode)
        document.getElementById("leaveButton").style.display = "block"
        await scoutingJoinSubmit(userData.joinCode)
    }
}

function transition(){
    //transition to cover/uncover screen
    let element = document.getElementById("transitionBackground");
    let currentWidth = element.offsetWidth;
    let targetWidth = 100; 

    element.style.width = currentWidth < targetWidth ? targetWidth + "vw" : "0vw"
}

//cookies for join code
function newCookie(code) {
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

function deleteCookie(cookieName) {
    document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

function setCodeLabel(string){
    document.getElementById("joinCodeLabel").innerHTML = string
}

/*
 *
 *           end of autorun javascript
 *      anything below is not run on startup
 *              the exeptions are... 
 *
 *
 */
var _path = []
function draw(canvas) {
    var ctx = canvas.getContext("2d");
    canvas.width = canvas.clientWidth; // Set canvas width to its CSS width
    canvas.height = canvas.clientHeight; // Set canvas height to its CSS height
    var isDrawing = false;
    // var path = []; // Array to store drawn path

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);

    function startDrawing(event) {
        isDrawing = true;
        _path.push([event.offsetX, event.offsetY]); // Store starting point of the path
        draw(event); // Call draw initially to start drawing from the current position
    }

    function draw(event) {
        if (!isDrawing) return;
        var x = event.offsetX;
        var y = event.offsetY;
        _path.push([x, y]); // Store current point of the path
        redraw();
    }

    function stopDrawing() {
        isDrawing = false;
    }

    function redraw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        ctx.beginPath();
        ctx.moveTo(_path[0][0], _path[0][1]); // Move to the starting point
        for (var i = 1; i < _path.length; i++) {
            var point = _path[i];
            ctx.lineTo(point[0], point[1]); // Draw line to each point
        }
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    console.log(_path)
}

function addScouting() {
    //add to the server then it will pull the data from the server
    document.getElementById("scoutingSheet").style.display= "block"
}

function finishAddScouting(joinCode){
    //pull data from server then it will push the updated data
    let scoutPanel = document.getElementById("scoutingSheet")
    scoutPanel.style.display= "none"
      // Extracting data from HTML
    // var teamNumber = document.getElementById('teamNumber').value;
    // var teamName = document.getElementById('teamName').textContent;
    // var humanComm = document.querySelector('input[name="communication"]:checked').value;
    // var humanPreferences = document.querySelector('input[name="humanPreferences"]:checked').value;
    // var notes = document.querySelector('.text_area').value;
    // var preferredSide = document.querySelector('input[name="preferredSide"]:checked').value === "1";
    // var autoPixels = document.querySelector('.auto_sheet input[type="number"]').value;
    // var teamProp = document.querySelector('input[name="teamProp"]:checked').value === "1";
    // var autoDelay = document.querySelector('input[name="autoDelay"]:checked').value === "1";
    // var autoRoute = document.querySelector('.draw_panel').toDataURL(); // Assuming autoRoute is stored as base64 image data
    // var telePixels = document.querySelector('.tele_end_sheet input[type="number"]').value;
    // var mosaics = document.querySelectorAll('.tele_end_sheet input[type="number"]')[1].value;
    // var drone = document.querySelector('input[name="drone"]:checked').value === "1";
    // var suspend = document.querySelector('input[name="suspend"]:checked').value === "1";

    // Creating a Team object
    // var team = new Team(teamNumber, teamName, parseInt(humanComm), humanPreferences === "1", notes, preferredSide, parseInt(autoPixels), teamProp, autoDelay, autoRoute, parseInt(telePixels), parseInt(mosaics), drone, suspend);
    // console.log(team)
    transition()
    return team;
}

function editScouting(){
    //pulls data find affected team then pushes data    
}

function removeScouting(currentSelector,joinCode){
    //pulls data, finds the selected team and removes it then pushes data

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

function scoutingLeave() {
    for (let i = 0; i < buttonList.length; i++) {
        buttonList[i].remove();
    }
    userData.joinCode = 0
    setCodeLabel("Code")
    updateCookie()
    currentSelector = null
    masterList = []
    buttonList = []
    transition()
    ftcJoinAsk()
    document.getElementById("scoutingSheet").style.display= "none"
}

function buttonPopulate(){
    let buttonContainer = document.getElementById("buttonContainer")
    for (let i = 0; i < buttonList.length; i++) {
        buttonList[i].remove();
    }
    buttonList = []
    //create the buttons from the masterList
    for (let i = 0; i < masterList.length; i++) {
        let team = masterList[i];
        buttonList[i] = document.createElement("button");
        buttonList[i].textContent = `${team.teamNumber}: ${team.teamName}`;
        buttonList[i].classList.add("main_buttons");
        buttonContainer.appendChild(buttonList[i]);
    }
}

async function scoutingJoinSubmit(joinCode) {
    // Will send code to server; if it exsits it will pull data, if not then it will get a 400 invalid code

    fetch('/join', {
        method: 'POST',
        cache: "no-cache",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ joinCode: joinCode })
    })
    .then(res => {
        if(res.ok)
            return res.json()
        else if(res.status === 400) {
            alert('Invalid code')
            throw new Error('Invalid code')
        }
        throw new Error('Failed on join')
    })
    .then(data => {
        setCodeLabel(joinCode)
        newCookie(joinCode)
        userData = parseCookie()
        console.log(data.teamsList)
        masterList = data.teamsList
        document.getElementById("joinPopup").style.display   = "none"
        document.getElementById("joinArea").style.display    = "none"
        document.getElementById("leaveButton").style.display = "block"
        transition()
        buttonPopulate()
    })
    .catch(error => {
        console.error('Error:', error)
    })
}

async function storeList(joinCode, teamsList)
{
    try {
        const response = await fetch(location.protocol + '//' + location.host + "/setTList", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({joinCode:joinCode, teamsList:teamsList})
        })
        return response.status === 200
    } 
    catch(error) {
        console.error('Error during list store')
        console.error(error)
        return false
    }
}

async function scoutingGroupCreate() {
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
        setCodeLabel(data.joinCode)
        newCookie(data.joinCode)
        userData = parseCookie()
        document.getElementById("joinPopup").style.display = "none"
        document.getElementById("leaveButton").style.display = "block"
        transition()
    })
    .catch(error => {
        console.error('Error:', error)
    })
}