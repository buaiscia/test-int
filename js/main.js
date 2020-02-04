'use strict'

// defining variables

var video = document.createElement("video");
var canvasElement = document.getElementById("canvas");
var canvas = canvasElement.getContext("2d");
var loadingMessage = document.getElementById("loadingMessage");
var outputContainer = document.getElementById("output");
var outputMessage = document.getElementById("outputMessage");
var codeData = [];
var button;

//defining private variables
let allKeys = [];
let maxKey;
let maxValueKey = 0;

//new GetData object to call its function

import GetData from '../js/getData.js'
const GetAllData = new GetData();
GetAllData.getData();


//  initializing canvas for camera

function drawLine(begin, end, color) {
  canvas.beginPath();
  canvas.moveTo(begin.x, begin.y);
  canvas.lineTo(end.x, end.y);
  canvas.lineWidth = 4;
  canvas.strokeStyle = color;
  canvas.stroke();
}

// Use facingMode: environment to attemt to get the front camera on phones
navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function (stream) {
  video.srcObject = stream;
  video.setAttribute("playsinline", true);        // required to tell iOS safari we don't want fullscreen
  video.play();
  requestAnimationFrame(tick);
});

//loop function to show imageData

function tick() {
  loadingMessage.innerText = "⌛ Loading video..."
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    loadingMessage.hidden = true;
    canvasElement.hidden = false;
    outputContainer.hidden = false;

    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);  
    var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);         // get data from camera
    var code = jsQR(imageData.data, imageData.width, imageData.height, {                          // call jSQR to identify when QR code present
      inversionAttempts: "dontInvert",
    });
    if (code) {
      // console.log("Found QR code", code.data);
      outputMessage.hidden = true;
      codeData.push(code.data);                         // pushing data to codeData array to get later
      canvasElement.hidden = true;
      
      makeQrButton();                                   // call function to create button to reload tick() in case of no/hidden canvas
      list();                                           // call function to store data taken and list view
      return codeData;
    } else {
      outputMessage.hidden = false;
    }
  }
  requestAnimationFrame(tick);
}
function list() {

  if (codeData) {                                  // storing/listing only when array is filled, if empty just listing
    // console.log(codeData);
    maxValueKey = getMaxKey();                     //getting max key value in order to continue storing from the next value after max. In this way the storage won't override with same keys once page is reloaded.
    if (!isFinite(maxValueKey)) {                  //if localstorage is empty == infinite max key value
      maxValueKey = 0;                              //assigning 0 as max value to start storiing in this case
    }
    for (let i = 0; i < codeData.length; i++) {
      storeData(maxValueKey + 1, codeData[i]);      //storing data from the array with key = maxvalue + 1 (so maxvalue won't be overridden)
    }
    GetAllData.getData();                           //show list of values

  }
}

function storeData(index, codes) {
  window.localStorage.setItem(index, codes);      //store item in localStorage
  // console.log('storedata called');
}



function getMaxKey() {                                            //getting max value from the keys
  for (let i = 0; i < Object.keys(localStorage).length; i++) {
    let parsedKey = parseInt(Object.keys(localStorage)[i], 10)    //transforming keys from string to numbers
    allKeys.push(parsedKey);                                      // push values in allKeys array
  }
  maxKey = Math.max.apply(null, allKeys);                         //getting max value from allKeys array
  return maxKey;

}


function makeQrButton() {
  if (!button) {                                           // if button is already present don't create a new one
    button = document.createElement('button');
    button.innerHTML = 'New QR code';
    var newQR = document.getElementById('newQR');
    newQR.appendChild(button);
    button.addEventListener('click', function () {        // add listener onclick to call back tick() and reopen then canvas
      return tick();
    })
  }

}