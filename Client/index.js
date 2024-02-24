//cookies (holds join code)
const userData = parseCookie()
//current object of interest
let currentSelector = null
//holds data related to teams scouting
let masterList = null

class Team {
    constructor(teamNumber, teamName, preferredSide,
                autoPixels, teamProp, autoDelay, autoRoute,
                telePixels, mosaics, drone, suspend,
                humanComm, humanPrefrences, generalStrategy, notes) {
      // General properties
      this.teamNumber = teamNumber;
      this.teamName = teamName;
      this.humanComm = humanComm;
      this.humanPrefrences = humanPrefrences;
      this.generalStrategy = generalStrategy;
      this.notes = notes;
  
      // Auto properties
      this.preferredSide = preferredSide;
      this.autoPixels = autoPixels;
      this.teamProp = teamProp;
      this.autoDelay = autoDelay;
      this.autoRoute = autoRoute;
  
      // Teleop properties
      this.telePixels = telePixels;
      this.mosaics = mosaics;
  
      // Endgame properties
      this.drone = drone;
      this.suspend = suspend;
    }
  }

/*
 *
 *           end of const varibles
 *
 */

//this will check for exisitng join code if not and run a function 
//the function scoutingJoin and scoutingCreate will await response
function ftcJoinAsk (){
    if(userData == undefined){
        let joinPopup = document.getElementById("joinPopup")
        joinPopup.style.display = "block"
    }else{
        initializeScouting()
    }
}

//cookies for join code
function newCookie() {
    userData = {
        joinCode: 0
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
 *              initializeScouting,
 *                scoutingJoin,
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

    var ctx = canvas.getContext("2d");

    canvas.width = canvas.clientWidth; // Set canvas width to its CSS width
    canvas.height = canvas.clientHeight; // Set canvas height to its CSS height

    var isDrawing = false;

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);

    function startDrawing(event) {
        ctx.beginPath();
        isDrawing = true;
        draw(event); // Call draw initially to start drawing from the current position
    }

    function draw(event) {
        if (!isDrawing) return;
        var x = event.offsetX;
        var y = event.offsetY;
        ctx.lineTo(x, y);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    function stopDrawing() {
        isDrawing = false;
    }
}

function addScouting(){
    //add to the server then it will pull the data from the server
    let scoutPanel = document.getElementById("scoutingSheet")
    scoutPanel.style.display= "block"

}

function finishAddScouting(joinCode){
    //adds
    let scoutPanel = document.getElementById("scoutingSheet")
    scoutPanel.style.display= "none"
}

function removeScouting(teamName,joinCode){
//send the request to delete such data

}

function ftcLookup(){
//comunication to grab info from api through server

}

function ftcLookupName(){
    let teamNumber= document.getElementById("teamNumber").value
    console.log(teamNumber)
}

function scoutingJoin(){
//joins with code
}

function scoutingCreate(){
//sends a request to create join code
}

function initializeScouting(joinCode){
//pulls data from server joning with code

}


/*
 *
 *           example js
 * 
 */

// function fetchData() {
//     fetch('http://localhost:5501/data') // Assuming your backend is running on port 5501
//         .then(response => response.json())
//         .then(data => {
//         document.getElementById('serverResponse').innerText = data.message;
//         })
//         .catch(error => console.error('Error:', error));
//     }

ftcJoinAsk ()