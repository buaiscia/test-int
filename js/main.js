`use strict`

var video = document.createElement("video");
var canvasElement = document.getElementById("canvas");
var canvas = canvasElement.getContext("2d");
var loadingMessage = document.getElementById("loadingMessage");
var outputContainer = document.getElementById("output");
var outputMessage = document.getElementById("outputMessage");
var outputData = document.getElementById("outputData");
var codeData = [];
var listPoints = null;
let check;
let obKey;
let obKey1;
let ob1;
let max = [];
let maxKey;
let maxmax = 0;


const removeElements = (elms) => elms.forEach(element => element.remove());

getData();

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
    // if (check) {
      
    // }
    
    maxmax = getMaxKey();

    if(!isFinite(maxmax)) {
      maxmax = 0;
    }
    
    for (let i = 0; i < codeData.length; i++) {
      console.log(i, maxmax);

      
      storeData(maxmax + 1, codeData[i]);

      // var listPoints = document.createElement("LI");
      // listPoints.className = 'listElem';
      // // console.log(listPoints);

      // var eachCoffee = document.createTextNode('id is: ' + JSON.parse(codeData[i]).id + ', name is: ' + JSON.parse(codeData[i]).name);

      // listPoints.appendChild(eachCoffee);
      // document.getElementById('list').appendChild(listPoints);
      // check = true;
    }
    getData();


  }
}

function storeData(index, codes) {
  window.localStorage.setItem(index, codes);
  console.log('storedata called');
  
}

function getData() {
  if (Object.keys(localStorage).length !== 0) {
    removeElements(document.querySelectorAll('.listElem'));
    obKey = Object.keys(localStorage);
    for (let index in localStorage) {
      if (localStorage[obKey[index]]) {
        ob1 = JSON.parse(localStorage[obKey[index]]);
        console.log(ob1);
        let listPoints = document.createElement("LI");
        listPoints.className = 'listElem';
        let eachCoffee = document.createTextNode('id is: ' + ob1.id + ', name is: ' + ob1.name);
        listPoints.appendChild(eachCoffee);
        document.getElementById('list').appendChild(listPoints);
      }
    }
  }

};

function getMaxKey () {
  for(i=0; i<Object.keys(localStorage).length; i++) {
    let parsedKey = parseInt(Object.keys(localStorage)[i], 10)
    max.push(parsedKey);
    // console.log((parseInt(Object.keys(localStorage)[i], 10)))
  }
  maxKey = Math.max.apply(null, max);
  return maxKey;
  
}

// getData = () => {
//   if (Object.keys(localStorage).length !== 0) {
//     for (let index in localStorage) {
//       let locStore = localStorage[index];
//       console.log(locStore);
//       if (locStore) {

//         let listPoints = document.createElement("LI");
//         listPoints.className = 'listElem';
//         let eachCoffee = document.createTextNode('id is: ' + JSON.parse(locStore).id + ', name is: ' + JSON.parse(locStore).name);
//         listPoints.appendChild(eachCoffee);
//         document.getElementById('list').appendChild(listPoints);
//         return locStore;
//       }
//     }
//   }
// };



