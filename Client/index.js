//cookies (holds join code)
let userData = parseCookie()
let edit = false;
//current team of interest
let currentSelector = null
//holds data related to teams scouting
let masterList = []
//hold the DOM objects for buttons
let buttonList = []

ftcJoinAsk()

/*
 *
 *           end of main varibles
 *
 */

//this will check for exisitng join code if not and run a function 
//the function scoutingJoin and scoutingCreate will await response
async function ftcJoinAsk() {
    if (userData == undefined || userData.joinCode == undefined || userData.joinCode == 0) {
        document.getElementById("joinPopup").style.display = "block"
        document.getElementById("leaveButton").style.display = "none"
    }
    else {
        transition()
        setCodeLabel(userData.joinCode)
        document.getElementById("leaveButton").style.display = "block"
        await scoutingJoinSubmit(userData.joinCode)
    }
}

function transition() {
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
        return (userData)
    }
}

function deleteCookie(cookieName) {
    document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

function setCodeLabel(string) {
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

function editPrepare() {
    edit = true;
    let team = masterList.find(x => x.teamNumber == currentSelector)
    document.getElementById('teamNumber').value = team.teamNumber;
    document.getElementById('teamNumber').disabled = true;
    document.getElementById('teamName').value = team.teamName;
    document.getElementById('communication' + team.humanComm).checked = true; // Assuming 'communication' is the name of the radio button group
    document.getElementById('humanPreferences' + team.humanPreferences).checked = true; // Assuming 'humanPreferences' is the name of the radio button group
    document.querySelector('.text_area').value = team.notes;
    document.getElementById('preferredSide' + team.preferredSide).checked = true; // Assuming 'preferredSide' is the name of the radio button group
    document.querySelector('.auto_sheet input[type="number"]').value = team.autoPixels;
    document.getElementById('teamProp' + team.teamProp).checked = true; // Assuming 'teamProp' is the name of the radio button group
    document.getElementById('autoDelay' + team.autoDelay).checked = true; // Assuming 'autoDelay' is the name of the radio button group
    // Set autoRoute based on 'points' in team object
    document.querySelector('.tele_end_sheet input[type="number"]').value = team.telePixels;
    document.querySelectorAll('.tele_end_sheet input[type="number"]')[1].value = team.mosaics;
    document.getElementById('drone' + team.drone).checked = true; // Assuming 'drone' is the name of the radio button group
    document.getElementById('suspend' + team.suspend).checked = true; // Assuming 'suspend' is the name of the radio button group
}

async function finishAddScouting() {
    //pull data from server then it will push the updated data
    let scoutPanel = document.getElementById("scoutingSheet")
    scoutPanel.style.display = "none"
    // Extracting data from HTML
    let scoutingTeam = {
        "teamNumber": document.getElementById('teamNumber').value ? parseInt(document.getElementById('teamNumber').value) : "N/A",
        "teamName": document.getElementById('teamName').value ? document.getElementById('teamName').value : "N/A",
        "humanComm": document.querySelector('input[name="communication"]:checked') ? parseInt(document.querySelector('input[name="communication"]:checked').value) : 0,
        "humanPreferences": document.querySelector('input[name="humanPreferences"]:checked') ? parseInt(document.querySelector('input[name="humanPreferences"]:checked').value) : 0,
        "notes": document.querySelector('.text_area').value ? document.querySelector('.text_area').value : "N/A",
        "preferredSide": document.querySelector('input[name="preferredSide"]:checked') ? parseInt(document.querySelector('input[name="preferredSide"]:checked').value) : 0,
        "autoPixels": document.querySelector('.auto_sheet input[type="number"]').value ? parseInt(document.querySelector('.auto_sheet input[type="number"]').value) : 0,
        "teamProp": document.querySelector('input[name="teamProp"]:checked') ? parseInt(document.querySelector('input[name="teamProp"]:checked').value) : 0,
        "autoDelay": document.querySelector('input[name="autoDelay"]:checked') ? parseInt(document.querySelector('input[name="autoDelay"]:checked').value) : 0,
        "autoRoute": points,
        "telePixels": document.querySelector('.tele_end_sheet input[type="number"]').value ? parseInt(document.querySelector('.tele_end_sheet input[type="number"]').value) : 0,
        "mosaics": document.querySelectorAll('.tele_end_sheet input[type="number"]')[1].value ? parseInt(document.querySelectorAll('.tele_end_sheet input[type="number"]')[1].value) : 0,
        "drone": document.querySelector('input[name="drone"]:checked') ? parseInt(document.querySelector('input[name="drone"]:checked').value) : 0,
        "suspend": document.querySelector('input[name="suspend"]:checked') ? parseInt(document.querySelector('input[name="suspend"]:checked').value) : 0
    }
    //add item to masterlist

    await scoutingJoinSubmit(userData.joinCode)
    var oldIndex = 0;
    if(edit) {
        oldIndex = masterList.findIndex(team => team.teamNumber == currentSelector)
        //console.log(oldIndex)
        masterList[oldIndex] = scoutingTeam
        //console.log(masterList)
        infoPanelShow(oldIndex)
        
    } else {
        masterList.push(scoutingTeam)
    }
    edit = false;
    await storeList(userData.joinCode, JSON.stringify(masterList))
    document.getElementById('formScout').reset()
    document.getElementById('teamNumber').disabled = false;
    scoutingTeam = []
    await scoutingJoinSubmit(userData.joinCode)
    
    transition()
}

async function removeScouting() {
    //pulls data, finds the selected team and removes it then pushes data
    await scoutingJoinSubmit(userData.joinCode)
    for(const teamObject of masterList) {
        if(teamObject.teamNumber === currentSelector) {
            masterList.splice(masterList.indexOf(teamObject), 1)
            break
        }
    }

    await storeList(userData.joinCode, JSON.stringify(masterList))
    await scoutingJoinSubmit(userData.joinCode)
}

function scoutingLeave() {
    for (let i = 0; i < buttonList.length; i++) {
        buttonList[i].remove();
    }
    userData.joinCode = 0
    setCodeLabel("Code")
    updateCookie()
    masterList = []
    buttonList = []
    document.getElementById("transitionBackground").style.display = "block"
    transition()
    ftcJoinAsk()
    document.getElementById("scoutingSheet").style.display = "none"
}

function buttonPopulate() {
    //create then adds the buttons to buttonContainer with the necessary data
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
        buttonList[i].addEventListener("click", () => {
            infoPanelShow(i);
            currentSelector = masterList[i].teamNumber
        });
    }
}

function infoPanelShow(index) {
    //will display scouting stats from said team
    document.getElementById("infoName").innerHTML = masterList[index].teamName
    document.getElementById("infoNumber").innerHTML = masterList[index].teamNumber
    document.getElementById("infoSide").innerHTML = masterList[index].preferredSide

    if (parseInt(masterList[index].preferredSide) == 1) {
        document.getElementById("infoSide").innerHTML = "Close"
    } else if (parseInt(masterList[index].preferredSide) == 0) {
        document.getElementById("infoSide").innerHTML = "Far"
    } else {
        document.getElementById("infoSide").innerHTML = "N/A"
    }

    document.getElementById("infoPixel").innerHTML = masterList[index].autoPixels

    if (parseInt(masterList[index].teamProp) == 1) {
        document.getElementById("infoProp").innerHTML = "Yes"
    } else if (parseInt(masterList[index].teamProp) == 0) {
        document.getElementById("infoProp").innerHTML = "No"
    } else {
        document.getElementById("infoProp").innerHTML = "N/A"
    }
    
    if (parseInt(masterList[index].autoDelay) == 1) {
        document.getElementById("infoAuto").innerHTML = "Yes"
    } else if (parseInt(masterList[index].autoDelay) == 0) {
        document.getElementById("infoAuto").innerHTML = "No"
    } else {
        document.getElementById("infoAuto").innerHTML = "N/A"
    }

    points = masterList[index].autoRoute
    document.getElementById("infoTelePixels").innerHTML = masterList[index].telePixels
    document.getElementById("infoMosaics").innerHTML = masterList[index].mosaics

    if (parseInt(masterList[index].drone) == 1) {
        document.getElementById("infoDrone").innerHTML = "Yes"
    } else if (parseInt(masterList[index].drone) == 0) {
        document.getElementById("infoDrone").innerHTML = "No"
    } else {
        document.getElementById("infoDrone").innerHTML = "N/A"
    }

    if (parseInt(masterList[index].suspend) == 1) {
        document.getElementById("infoSuspend").innerHTML = "Yes"
    } else if (parseInt(masterList[index].suspend) == 0) {
        document.getElementById("infoSuspend").innerHTML = "No"
    } else {
        document.getElementById("infoSuspend").innerHTML = "N/A"
    }

    if (parseInt(masterList[index].humanComm) == 0) {
        document.getElementById("infoCom").innerHTML = "Cards"
    } else if (parseInt(masterList[index].humanComm) == 1) {
        document.getElementById("infoCom").innerHTML = "Hands"
    } else if (parseInt(masterList[index].humanComm) == 2) {
        document.getElementById("infoCom").innerHTML = "Yelling"
    } else if (parseInt(masterList[index].humanComm) == 3) {
        document.getElementById("infoCom").innerHTML = "Nothing"
    } else {
        document.getElementById("infoCom").innerHTML = "N/A"
    }

    if (parseInt(masterList[index].humanPreferences) == true) {
        document.getElementById("infoPref").innerHTML = "Yes"
    } else if (parseInt(masterList[index].humanPreferences) == false) {
        document.getElementById("infoPref").innerHTML = "No"
    } else {
        document.getElementById("infoPref").innerHTML = "N/A"
    }

    document.getElementById("infoNotes").innerHTML = masterList[index].notes
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
            if (res.ok)
                return res.json()
            else if (res.status === 400) {
                alert('Invalid code')
                throw new Error('Invalid code')
            }
            throw new Error('Failed on join')
        })
        .then(data => {
            masterList = data.teamsList
            setCodeLabel(joinCode)
            newCookie(joinCode)
            userData = parseCookie()
            document.getElementById("joinPopup").style.display = "none"
            document.getElementById("joinArea").style.display = "none"
            document.getElementById("leaveButton").style.display = "block"
            buttonPopulate()
        })
        .catch(error => {
            console.error('Error:', error)
        })
}

async function storeList(joinCode, teamsList) {
    try {
        console.log(joinCode)
        const response = await fetch(location.protocol + '//' + location.host + "/setTList", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ joinCode: joinCode, teamsList: teamsList })
        })
        return response.status === 200
    }
    catch (error) {
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
            if (res.ok)
                return res.json()
            throw new Error('Failed to create join code')
        })
        .then(data => {
            setCodeLabel(data.joinCode)
            newCookie(data.joinCode)
            userData = parseCookie()
            document.getElementById("joinPopup").style.display = "none"
            document.getElementById("leaveButton").style.display = "block"
        })
        .catch(error => {
            console.error('Error:', error)
        })
}