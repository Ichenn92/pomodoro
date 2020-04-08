let intervalID;
let workTimeMinute = 25;
let workTimeSecond = 00;
let restTimeMinute = 5;
let restTimeSecond = 00;
let workTimeMinuteCustom;
let workTimeSecondCustom;
let restTimeMinuteCustom;
let restTimeSecondCustom;
let workTimeIsOn = true;
let restTimeIsOn = false;
let alreadyPlayed = false;

// Time modifier on clock
const workTimeUp_i = document.getElementById("workTime-up");
const workTimeDown_i = document.getElementById("workTime-down");
const restTimeUp_i = document.getElementById("rest-time-up");
const restTimeDown_i = document.getElementById("rest-time-down");
const workTimeMinute_p = document.getElementById("workTime-minute");
const workTimeSecond_p = document.getElementById("workTime-second");
const restTimeMinute_p = document.getElementById("rest-time-minute");
const restTimeSecond_p = document.getElementById("rest-time-second");

// Controllers
const play_i = document.getElementById("controller-play");
const pause_i = document.getElementById("controller-pause");
const break_i = document.getElementById("controller-break");
const action_span = document.getElementById("action");

// Trigger which clock is currently ON
const workTimeClock_span = document.getElementsByClassName("workTime-clock");
const restTimeClock_span = document.getElementsByClassName("rest-time-clock");


// Button change based Timer -------------------------
function workTimeUp(){
    if (alreadyPlayed)
        return;
    if (workTimeMinute < 90) {
        workTimeMinute++;
        workTimeMinute_p.innerHTML = workTimeMinute;
    }
}
function workTimeDown(){
    if (alreadyPlayed)
        return;
    if (workTimeMinute > 15) {
        workTimeMinute--;
        workTimeMinute_p.innerHTML = workTimeMinute;
    }
}
function restTimeUp(){
    if (alreadyPlayed)
        return;
    if (restTimeMinute < 90) {
        restTimeMinute++;
        restTimeMinute_p.innerHTML = restTimeMinute;
    }
}
function restTimeDown(){
    if (alreadyPlayed)
        return;
    if (restTimeMinute > 0) {
        restTimeMinute--;
        restTimeMinute_p.innerHTML = restTimeMinute;
    }
}

// CountDown Functions -------------------------------
function countDown(){
    if(workTimeIsOn) {
        if (workTimeSecond == 0){
            workTimeSecond = 59;
            workTimeMinute--;
            displayWorkTime(workTimeMinute, workTimeSecond);
        } else {
            workTimeSecond--;
            workTimeSecond_p.innerHTML = workTimeSecond;
            displayWorkTime(workTimeMinute, workTimeSecond);
        }
    } else if (restTimeIsOn) {
        if (restTimeSecond == 0){
            restTimeSecond = 59;
            restTimeMinute--;
            displayRestTime(restTimeMinute, restTimeSecond);
        } else {
            restTimeSecond--;
            restTimeSecond_p.innerHTML = restTimeSecond;
            displayRestTime(restTimeMinute, restTimeSecond);
        }
    }
    
    if(workTimeMinute == 0 && workTimeSecond == 0) {
        workTimeIsOn = false;
        restTimeIsOn = true;
        workTimeMinute = workTimeMinuteCustom;
        workTimeSecond = workTimeSecondCustom;
        displayWorkTime(workTimeMinute, workTimeSecond);
        action_span.innerHTML = "CHILLING";
    } else if (restTimeMinute == 0 && restTimeSecond == 0) {
        workTimeIsOn = true;
        restTimeIsOn = false;
        restTimeMinute = restTimeMinuteCustom;
        restTimeSecond = restTimeSecondCustom;
        displayRestTime(restTimeMinute, restTimeSecond);
        action_span.innerHTML = "WORKING";
    }
}

// Displaying Timers -------------------------
function displayWorkTime(minute, second){
    if (second < 10) {
        workTimeMinute_p.innerHTML = minute;
        workTimeSecond_p.innerHTML = "0" + second.toString(); 
    } else if (second > 10 || second < 59) {
        workTimeMinute_p.innerHTML = minute;
        workTimeSecond_p.innerHTML = second;
    } else {
        workTimeMinute_p.innerHTML = minute;
        workTimeSecond_p.innerHTML = second;
    }
}
function displayRestTime(minute, second){
    if (second < 10) {
        restTimeMinute_p.innerHTML = minute;
        restTimeSecond_p.innerHTML = "0" + second.toString(); 
    } else if (second > 10 || second < 59) {
        restTimeMinute_p.innerHTML = minute;
        restTimeSecond_p.innerHTML = second;
    } else {
        restTimeMinute_p.innerHTML = minute;
        restTimeSecond_p.innerHTML = second;
    }
}

// Controller functions --------------------------------
function play() {
    if (!alreadyPlayed) {
        workTimeMinuteCustom = workTimeMinute;
        workTimeSecondCustom = workTimeSecond;
        restTimeSecondCustom = restTimeSecond;
        restTimeMinuteCustom = restTimeMinute;
        alreadyPlayed = true;
    }
    intervalID = window.setInterval(function setTimer(){
        countDown();
      }, 10);
}

function pause() {
    if (intervalID)
        clearInterval(intervalID);
}

function breakTime() {
    if (intervalID) {
        clearInterval(intervalID);
    }
        alreadyPlayed = false;
        workTimeMinute = 25;
        workTimeSecond = 00;
        restTimeMinute = 5;
        restTimeSecond = 00;
        displayWorkTime(workTimeMinute, workTimeSecond);
        displayRestTime(restTimeMinute, restTimeSecond);
}

// DOM functions -----------------------------------------
function main() {
    play_i.addEventListener('click', function() {
        if(!alreadyPlayed) {}
            action_span.innerHTML = "WORKING";
        play();
    })
    pause_i.addEventListener("click", function() {
        pause();
    })
    break_i.addEventListener("click", function() {
        action_span.innerHTML = "START";
        breakTime();
    })

    workTimeUp_i.addEventListener("click", function () {
        workTimeUp();
        console.log(workTimeMinute);
    })
    workTimeDown_i.addEventListener("click", function () {
        workTimeDown();
        console.log(workTimeMinute);
    })
    
    restTimeUp_i.addEventListener("click", function () {
        restTimeUp();
        console.log(restTimeMinute);
    })
    restTimeDown_i.addEventListener("click", function () {
        restTimeDown();
        console.log(restTimeMinute);
    })
}

//------------------------------------------------
//  MAIN
//------------------------------------------------
main();