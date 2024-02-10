const userData = parseCookie()

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
    let scoutPanel = document.getElementById("scoutingSheet")
    scoutPanel.style.display= "block"

}

function finishAddScouting(){
    let scoutPanel = document.getElementById("scoutingSheet")
    scoutPanel.style.display= "none"
}

function removeScouting(){
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