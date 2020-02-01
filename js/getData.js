function getData () {
  if (Object.keys(localStorage).length !== 0) {
    for (index in localStorage) {
      let locStore = localStorage[index];
      console.log('locstore before check called: ' + locStore);
      console.log(typeof locStore);
      console.log(JSON.parse(locStore));
      
      // if (locStore) {
      //   console.log('locstore after check called: ' + localStorage[index]);
        
      //   let listPoints = document.createElement("LI");
      //   listPoints.className = 'listElem';
      //   let eachCoffee = document.createTextNode('id is: ' + JSON.parse(locStore).id + ', name is: ' + JSON.parse(locStore).name);
      //   listPoints.appendChild(eachCoffee);
      //   document.getElementById('list').appendChild(listPoints);
        // return locStore;
      // }
    }
  }
};

// for (let index in localStorage) {
//   console.log(localStorage[index]);
// }