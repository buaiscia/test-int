//importing collections

import { PROCESSING_METHOD_OPTIONS, WEIGHT_UNIT_OPTIONS } from '../util/enums.js'
import { CERTIFICATES } from '../util/fixtures.js'


class GetData extends HTMLElement {


  constructor() {
    super();
    let self = this;
    this.getData = this.getData.bind(this);

    this.removeKey = function (key) {
      return function () {
        window.localStorage.removeItem(key);        //remove from storage. Neeeded callback function in order not to invoke immediately removeKey
        self.getData();                              // call getData to list items with this = self so it refers to parent element in constructor
      }
    }

    this.removeElements = function (elms) {
      elms.forEach(element => element.remove());     // remove items from the <ul> list.
      titleList.hidden = true;
    };

  }

  getData() {

    //defining private variables
    let processMethod;
    let weightUnit;
    let certif;
    let titleList = document.getElementById("titleList"); 


    //remove elements from the list <ul>
    let elems = document.querySelectorAll('.listElem');
    this.removeElements(elems);


    if (Object.keys(localStorage).length !== 0) {             //if localstorage is not empty

      let obKeyArray = Object.keys(localStorage);             // get keys in array
      for (let i = 0; i < localStorage.length; i++) {
        if (Object.keys(localStorage)[i]) {                   //if in index key exists. This prevents trying parsing whene key is empty
          let getIt = localStorage.getItem(obKeyArray[i])     //store the item string 
          let parsedStorage = JSON.parse(getIt);              //parse the string as JSON object

          PROCESSING_METHOD_OPTIONS.forEach(value => {
            if (value["value"] == parsedStorage.process)      // get processing method string by the JSON equivalent
              processMethod = value["label"];
          });

          WEIGHT_UNIT_OPTIONS.forEach(value => {
            if (value["value"] == parsedStorage.weight.unit)  // get weight units string by the JSON equivalent
              weightUnit = value["label"];
          });

          CERTIFICATES.forEach(value => {
            certif = parsedStorage.certificates.length == 0 ? 'none' : parsedStorage.certificates       // get certicifate string by the JSON equivalent
          });

          titleList.hidden = false;
          let localKey = obKeyArray[i];                                       // store the key
          let listPoints = document.createElement("LI");                      // create <li> element
          listPoints.className = 'listElem';
          listPoints.addEventListener('click', this.removeKey(localKey))      // add listener to remove item corresponding to the key on clicking it
          let eachCoffee = document.createTextNode(`id is ${parsedStorage.id}, country of origin is ${parsedStorage.name}, process: ${processMethod}, certificate: ${certif}, amount: ${parsedStorage.weight.amount}, unit: ${weightUnit}`)
          listPoints.appendChild(eachCoffee);
          document.getElementById('list').appendChild(listPoints);            //append li with className, listener and text to web component reference in html
        }
      }
    }
  };
}

customElements.define('get-data', GetData);     //define the class as web component 
export default GetData;                         // export the class in order to use its internal functions
