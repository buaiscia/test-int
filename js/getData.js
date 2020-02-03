import { PROCESSING_METHOD_OPTIONS, WEIGHT_UNIT_OPTIONS } from '../util/enums.js'
import { CERTIFICATES } from '../util/fixtures.js'


// let u = PROCESSING_METHOD_OPTIONS.forEach(value => {
//   if(value["value"] == 'NATURAL')
//   console.log(value["label"]);


// });




class GetData extends HTMLElement {


  constructor() {
    super();
    let self = this;
    this.getData = this.getData.bind(this);

    this.removeKey = function (key) {
      return function () {
        window.localStorage.removeItem(key);
        self.getData();
      }
    }

    this.removeElements = function (elms) {
      elms.forEach(element => element.remove())
    };

  }






  getData() {
    let processMethod;
    let weightUnit;
    let certif;
    let elems = document.querySelectorAll('.listElem');
    this.removeElements(elems);
    if (Object.keys(localStorage).length !== 0) {

      let obKeyArray = Object.keys(localStorage);
      for (let i = 0; i < localStorage.length; i++) {
        if (Object.keys(localStorage)[i]) {
          let getIt = localStorage.getItem(obKeyArray[i])
          let parsedStorage = JSON.parse(getIt);
          // console.log('localStorage key is  ' + obKeyArray[i]);

          PROCESSING_METHOD_OPTIONS.forEach(value => {
            if (value["value"] == parsedStorage.process)
              processMethod = value["label"];
          });

          WEIGHT_UNIT_OPTIONS.forEach(value => {
            if (value["value"] == parsedStorage.weight.unit)
            weightUnit = value["label"];
          });

          CERTIFICATES.forEach(value => {
            certif = parsedStorage.certificates.length == 0 ? 'none' : parsedStorage.certificates
          })


          let localKey = obKeyArray[i];
          let listPoints = document.createElement("LI");
          listPoints.className = 'listElem';
          listPoints.addEventListener('click', this.removeKey(localKey))
          let eachCoffee = document.createTextNode(`id is ${parsedStorage.id}, country of origin is ${parsedStorage.name}, process: ${processMethod}, certificate: ${certif}, amount: ${parsedStorage.weight.amount}, unit: ${weightUnit}`)
          listPoints.appendChild(eachCoffee);
          document.getElementById('list').appendChild(listPoints);
        }
      }
    }
    // return this;
  };



}

// getData = new GetData;

customElements.define('get-data', GetData);
export default GetData;
