let Promise = require('promise');
let request = require('request');
let cheerio = require('cheerio');
let fs = require('fs');

let First = [];
let Second = [];

let listrestos = [];
let scrapingRound = 1;

//Creating promises
function createPromises() {
  for (let i = 1; i < 38; i++) {
    let url = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-' + i.toString();
    First.push(fillRestaurantsList(url));
  }
}

function createIndividualPromises() {
  return new Promise(function(resolve) {
    if (scrapingRound === 1) {
      for (let i = 0; i < listrestos.length / 2; i++) {
        let restaurantURL = listrestos[i].url;
        Second.push(fillRestaurantInfo(restaurantURL, i));
      }
      resolve();
      //console.log("done")
      scrapingRound++;
    }
    if (scrapingRound === 2) {
      for (let i = listrestos.length / 2; i < listrestos.length; i++) {
        let restaurantURL = listrestos[i].url;
        Second.push(fillRestaurantInfo(restaurantURL, i));
      }
      resolve();
      //console.log("done")
    }
  })
}

//Fetching list of all restaurants
function fillRestaurantsList(url) {
  return new Promise(function(resolve, reject) {
    request(url, function(err, res, html) {
      if (err) {
        console.error(err)
        return reject(err)
      } else if (res.statusCode !== 200) {
        err = new Error("Unexpected status code : " + res.statusCode);
        err.res = res;
        console.error(err)
        return reject(err)
      }
      let home = cheerio.load(html);
      home('.poi-card-link').each(function() {
        let data = home(this);
        let link = data.attr("href");
        let url = "https://restaurant.michelin.fr/" + link;
        listrestos.push({
          "name": "",
          "postalCode": "",
          "chef": "",
          "url": url
        })
      });
      resolve(listrestos);
    });
  });
}

//Getting all detailed info the JSON
function fillRestaurantInfo(url, index) {
  return new Promise(function(resolve, reject) {
    request(url, function(err, res, html) {
      if (err) {
        console.error(err);
        return reject(err);
      } else if (res.statusCode !== 200) {
        err = new Error("Unexpected status code : " + res.statusCode);
        err.res = res;
        console.error(err)
        return reject(err)
      }

      const home = cheerio.load(html);
      home('.poi_intro-display-title').first().each(function() {
        let data = home(this);
        let name = data.text();
        name = name.replace(/\n/g, "");
        listrestos[index].name = name.trim();
      });

      home('.postal-code').first().each(function() {
        let data = home(this);
        let pc = data.text();
        listrestos[index].postalCode = pc;
      });

      home('#node_poi-menu-wrapper > div.node_poi-chef > div.node_poi_description > div.field.field--name-field-chef.field--type-text.field--label-above > div.field__items > div').first().each(function() {
        let data = home(this);
        let Cname = data.text();
        listrestos[index].chef = Cname;
      });
      resolve(listrestos);
    });
  });
}

//Savings
function saveRestaurantsInJson() {
  return new Promise(function(resolve) {
    try {
      let jsonRestaurants = JSON.stringify(listrestos);
      fs.writeFile("Restos.json", jsonRestaurants, function doneWriting(err) {
        if (err) {
          console.error(err);
        }
      });
    } catch (error) {
      console.error(error);
    }
    resolve();
  });
}

//Main()
createPromises();
Promise.all(First)
  .then(createIndividualPromises)
  .then(() => {
    return Promise.all(Second);
  })
  .then(createIndividualPromises)
  .then(() => {
    return Promise.all(Second);
  })
  .then(saveRestaurantsInJson)
  .then(() => {
    console.log("JSON filled")
  });

module.exports.getRestaurantsJSON = function() {
  return JSON.parse(fs.readFileSync("Restos.json"));
};