//cookies (holds join code)
const userData = parseCookie()
//current object of interest
let currentSelector = null
//holds data related to teams scouting
let masterList = null

class Team {
    constructor(teamNumber, teamName, preferredSide,
                autoPixels, teamProp, autoDelay, autoRoute,
                telePixels, mosaiacs, teleRoute, drone, suspend,
                humanComunication, humanPrefrences, generalStrategy, notes) {
      // General properties
      this.teamNumber = teamNumber;
      this.teamName = teamName;
      this.humanComunication = humanComunication;
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
      this.mosaiacs = mosaiacs;
      this.teleRoute = teleRoute;
  
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

//this will chekc for exisitng join code if not and run a function 
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

function addScouting(){
//add to the server then it will pull the data from the server
    let teamNumber = document.querySelector("#scoutingSheet input[type='number']").value;
    let preferredSide = document.querySelector("#scoutingSheet div:nth-child(2) .two_buttons button.selected").textContent;
    let autoPixels = document.querySelector("#scoutingSheet div:nth-child(2) .input input[type='number']").value;
    let teamProp = document.querySelector("#scoutingSheet div:nth-child(2) .two_buttons button.selected").textContent;
    let autoDelay = document.querySelector("#scoutingSheet div:nth-child(2) .two_buttons button.selected").textContent;
    let autoRoute = document.querySelector("#scoutingSheet div:nth-child(2) .draw canvas").toDataURL();
    let telePixels = document.querySelector("#scoutingSheet div:nth-child(4) .input input[type='number']").value;
    let mosaics = document.querySelector("#scoutingSheet div:nth-child(4) .input input[type='number']").value;
    let teleRoute = document.querySelector("#scoutingSheet div:nth-child(4) .draw canvas").toDataURL();
    let drone = document.querySelector("#scoutingSheet div:nth-child(6) .two_buttons button.selected").textContent;
    let suspend = document.querySelector("#scoutingSheet div:nth-child(6) .two_buttons button.selected").textContent;
    let humanComunication = document.querySelector("#scoutingSheet div:nth-child(8) .three_buttons button.selected").textContent;
    let humanPrefrences = document.querySelector("#scoutingSheet div:nth-child(8) .two_buttons button.selected").textContent;
    let generalStrategy = document.querySelector("#scoutingSheet div:nth-child(8) .input input[type='number']").value;
    let notes = document.querySelector("#scoutingSheet div:nth-child(8) .input input[type='number']").value;

    if (teamNumber !== "" && preferredSide !== "" && autoPixels !== "" && teamProp !== "" && autoDelay !== "" && autoRoute !== "" && telePixels !== "" && mosaics !== "" && teleRoute !== "" && drone !== "" && suspend !== "" && humanComunication !== "" && humanPrefrences !== "" && generalStrategy !== "" && notes !== "") {
        let newTeam = new Team(teamNumber, preferredSide, autoPixels, teamProp, autoDelay, autoRoute, telePixels, mosaics, teleRoute, drone, suspend, humanComunication, humanPrefrences, generalStrategy, notes);
        console.log(newTeam); // For demonstration, you can log the object to the console
    } else {
        alert("Please fill in all required fields.");
    }
}

function removeScouting(){
//send the request to delete such data

}

function ftcLookup(){
//comunication to grab info from api through server

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