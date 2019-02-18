const scrape = require('./hotelscraper.js');
const michelinScrape = require('./webscraper.js');
let fs = require('fs');

'use strict';

const hotelJSON = scrape.getHotelsJSON();
const JSONMichelin = michelinScrape.getRestaurantsJSON();

fs.writeFileSync("RelaisEtoiles.json",JSON.stringify(findMutualChefsAndPCs(hotelJSON, JSONMichelin)));

function findMutualChefsAndPCs(ListeHotels, ListeMichelin) {
    let HotelsEtoiles = [];
    for (let i = 0; i < ListeHotels.length; i++) {
        for (let j = 0; j < ListeMichelin.length; j++) {
            if (ListeHotels[i].chef === ListeMichelin[j].chef && ListeHotels[i].postalCode === ListeMichelin[j].postalCode) {
                HotelsEtoiles.push({"hotelName": ListeHotels[i].name, "restaurantName": ListeMichelin[j].name, "postalCode": ListeHotels[i].postalCode, "chef": ListeHotels[i].chef, "url": ListeHotels[i].url, "price": ListeHotels[i].price })
            }
        }
    }
    return HotelsEtoiles;
}
console.log("Fill filled");

function ajouterLigne()
{
    let tableau = ListeMichelin.getElementById("tableau");

    let ligne = tableau.insertRow(-1);//on a ajouté une ligne

    let name = ligne.insertCell(0);//on a une ajouté une cellule
    name.innerHTML += ListeMichelin.getElementById("name").value;//on y met le contenu de titre

    let postalCode = ligne.insertCell(1);//on ajoute la seconde cellule
    postalCode.innerHTML += ListeMichelin.getElementById("postalCode").value;

    let chef = ligne.insertCell(2);//on ajoute la seconde cellule
    chef.innerHTML += ListeMichelin.getElementById("chef").value;

    let url = ligne.insertCell(3);//on ajoute la seconde cellule
    url.innerHTML += ListeMichelin.getElementById("url").value;
}

ajouterLigne();