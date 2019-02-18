const relaischateau = require('./relais.js');
const michelin = require('./michelin.js');
let fs = require('fs');

'use strict';

const hotelJSON = relaischateau.getHotelsJSON();
const michelinJSON = michelin.getRestaurantsJSON();

fs.writeFileSync("RelaisRestos.json", JSON.stringify(ComparateHotelsMichelin(hotelJSON, michelinJSON)));

function ComparateHotelsMichelin(Hotels, Michelin) {
  let Hotels123Etoiles = [];
  for (let i = 0; i < Hotels.length; i++) {
    for (let j = 0; j < Michelin.length; j++) {
      if (Hotels[i].chef === Michelin[j].chef && Hotels[i].postalCode === Michelin[j].postalCode) {
        Hotels123Etoiles.push({"hotelName": Hotels[i].name,"restaurantName": Michelin[j].name,"postalCode": Hotels[i].postalCode,"chef": Hotels[i].chef,"url": Hotels[i].url,"price": Hotels[i].price
        })
      }
    }
  }
  return Hotels123Etoiles;
}

console.log("Fill written");
console.log("Here is the list of hotels having 1 2 or 3 stars restaurants");