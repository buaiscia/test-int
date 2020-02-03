
var video = document.createElement("video");
var canvasElement = document.getElementById("canvas");
var canvas = canvasElement.getContext("2d");
var loadingMessage = document.getElementById("loadingMessage");
var outputContainer = document.getElementById("output");
var outputMessage = document.getElementById("outputMessage");
var outputData = document.getElementById("outputData");
var codeData = [];
var button;

let max = [];
let maxKey;
let maxmax = 0;

import GetData from '../js/getData.js'

const GetAllData = new GetData();

GetAllData.getData();



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
  video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
  video.play();
  requestAnimationFrame(tick);
});

function tick() {
  loadingMessage.innerText = "⌛ Loading video..."
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    loadingMessage.hidden = true;
    canvasElement.hidden = false;
    outputContainer.hidden = false;

    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
    var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
    var code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert",
    });
    if (code) {
      console.log("Found QR code", code.data);
      drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
      drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
      drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
      drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
      outputMessage.hidden = true;
      codeData.push(code.data);
      outputData.parentElement.hidden = false;
      outputData.innerText = codeData;
      canvasElement.hidden = true;
      makeQrButton();
      list();
      return codeData;
    } else {
      outputMessage.hidden = false;
      outputData.parentElement.hidden = true;
    }
  }
  requestAnimationFrame(tick);
}
function list() {

  if (codeData) {
    console.log(codeData);
    
    maxmax = getMaxKey();

    if (!isFinite(maxmax)) {
      maxmax = 0;
    }

    for (let i = 0; i < codeData.length; i++) {
      storeData(maxmax + 1, codeData[i]);
    }
    GetAllData.getData();

  }
}

function storeData(index, codes) {
  window.localStorage.setItem(index, codes);
  console.log('storedata called');

}



function getMaxKey() {
  for (let i = 0; i < Object.keys(localStorage).length; i++) {
    let parsedKey = parseInt(Object.keys(localStorage)[i], 10)
    max.push(parsedKey);
  }
  maxKey = Math.max.apply(null, max);
  return maxKey;

}


function makeQrButton() {
  if(!button) {
  button = document.createElement('button');
  button.innerHTML = 'New QR code';

  var newQR = document.getElementById('newQR');
  newQR.appendChild(button);
  button.addEventListener('click', function() {
    return tick();
  } )
  }
  
}