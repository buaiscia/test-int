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





  // getData() {
  //   let elems = document.querySelectorAll('.listElem');
  //   this.removeElements(elems);
  //   if (Object.keys(localStorage).length !== 0) {

  //     let obKeyArray = Object.keys(localStorage);
  //     for (let index in localStorage) {
  //       if (localStorage[obKeyArray[index]]) {
  //         let parsedStorage = JSON.parse(localStorage[obKeyArray[index]]);
  //         console.log('localStorage key is  ' + localStorage.key(index));
  //         let localKey = localStorage.key(index);
  //         let listPoints = document.createElement("LI");
  //         listPoints.className = 'listElem';  
  //         listPoints.addEventListener('click', this.removeKey(localKey))
  //         let eachCoffee = document.createTextNode(`id is ${parsedStorage.id}, country of origin is ${parsedStorage.name}, process: ${parsedStorage.process}, certificate: ${parsedStorage.certificates.length == 0 ? 'none' : parsedStorage.certificates}, amount: ${parsedStorage.weight.amount}, unit: ${parsedStorage.weight.unit}`)
  //         listPoints.appendChild(eachCoffee);
  //         document.getElementById('list').appendChild(listPoints);
  //       }
  //     }
  //   }
  // };

  getData() {
    let elems = document.querySelectorAll('.listElem');
    this.removeElements(elems);
    if (Object.keys(localStorage).length !== 0) {

      let obKeyArray = Object.keys(localStorage);
      for (let i = 0; i < localStorage.length; i++) {
        if (Object.keys(localStorage)[i]) {
          let getIt = localStorage.getItem(obKeyArray[i])
          let parsedStorage = JSON.parse(getIt);
          console.log('localStorage key is  ' + obKeyArray[i]);
          let localKey = obKeyArray[i];
          let listPoints = document.createElement("LI");
          listPoints.className = 'listElem';
          listPoints.addEventListener('click', this.removeKey(localKey))
          let eachCoffee = document.createTextNode(`id is ${parsedStorage.id}, country of origin is ${parsedStorage.name}, process: ${parsedStorage.process}, certificate: ${parsedStorage.certificates.length == 0 ? 'none' : parsedStorage.certificates}, amount: ${parsedStorage.weight.amount}, unit: ${parsedStorage.weight.unit}`)
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
