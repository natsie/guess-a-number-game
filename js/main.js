"use strict";

const dateElement = document.getElementById("dateTime");
const display = document.getElementById("display");
const borders = document.getElementsByClassName("border");
const messageElement = document.getElementById("message");
const startFrom = document.getElementById("startFrom");
const toValue = document.getElementById("toValue");
const generateButton = document.getElementById("generateButton");
const replayElement = document.getElementById("playAgain");
const correctColor = "#00aa00";
const incorrectColor = "#ff0000";
const dateUpdate = function () {
    dateElement.innerHTML = new Date();
};
let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;
let resetDisplay;
let randomNumber;
let userInput;
let cron;

setInterval(dateUpdate, 1000);
replayElement.style.display = "none";

function updateDisplay(value) {
    if (display.innerHTML === "0" || resetDisplay === true) {
        display.innerHTML = value;
        resetDisplay = false;
    } else {
        display.innerHTML += value;
    }
    if (generateButton.innerHTML === "Generated!") generateButton.innerHTML = "Generate";
}
function playAgain() {
    display.innerHTML = "0";
    randomNumber = 0;
    messageElement.innerHTML = "";
    messageElement.style.display = "none";
    replayElement.style.display = "none";
    reset();
}
function updateColors(color) {
    document.getElementById("topBorder").style.backgroundColor = color;
    document.getElementById("bottomBorder").style.backgroundColor = color;
    document.getElementById("leftBorder").style.backgroundColor = color;
    document.getElementById("rightBorder").style.backgroundColor = color;
    messageElement.style.backgroundColor = color;
    messageElement.style.color = "white";
}
function generateRandomNumber(startFrom, to) {
    let difference = Number(to) - Number(startFrom);
    if (difference === 0) {
        randomNumber = Number(startFrom);
    } else {
        let generatedNumber = Math.floor(Math.random() * difference) + 1;
        randomNumber = Number(startFrom) + generatedNumber;
        if (Math.random() >= 0.5 && randomNumber === Number(startFrom) + 1) {
            randomNumber = Number(startFrom);
        }
    }
    console.log(randomNumber);
    generateButton.innerHTML = "Generated!";
    start();
}

function guessNumber() {
    messageElement.style.display = "block";
    userInput = Number(display.innerHTML);
    if (userInput === randomNumber) {
        pause();
        updateColors(correctColor);
        messageElement.innerHTML = `Yay... That's my number!`;
        messageElement.style.display = "block";
        replayElement.style.display = "block";
        resetDisplay = true;
    } else if (userInput > randomNumber) {
        console.log("Executed");
        updateColors(incorrectColor);
        messageElement.innerHTML = `Hmm... You went a bit high there.`;
        display.innerHTML = 0;
    } else if (userInput < randomNumber) {
        console.log("Executed");
        updateColors(incorrectColor);
        messageElement.innerHTML = `Umm... That's a bit low.`;
        display.innerHTML = 0;
    }
}

// Provision for timer with demo code

function start() {
    pause();
    cron = setInterval(() => {
        timer();
    }, 10);
}

function pause() {
    clearInterval(cron);
}

function reset() {
    hour = 0;
    minute = 0;
    second = 0;
    millisecond = 0;
    document.getElementById("hour").innerText = "00";
    document.getElementById("minute").innerText = "00";
    document.getElementById("second").innerText = "00";
    document.getElementById("millisecond").innerText = "000";
}

function timer() {
    if ((millisecond += 10) == 1000) {
        millisecond = 0;
        second++;
    }
    if (second == 60) {
        second = 0;
        minute++;
    }
    if (minute == 60) {
        minute = 0;
        hour++;
    }
    document.getElementById("hour").innerText = returnData(hour);
    document.getElementById("minute").innerText = returnData(minute);
    document.getElementById("second").innerText = returnData(second);
    document.getElementById("millisecond").innerText = returnData(millisecond);
}

function returnData(input) {
    return input >= 10 ? input : `0${input}`;
}

/*
// Provision for cookies with demo code

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  let user = getCookie("username");
  if (user != "") {
    alert("Welcome again " + user);
  } else {
    user = prompt("Please enter your name:", "");
    if (user != "" && user != null) {
      setCookie("username", user, 365);
    }
  }
}
*/
