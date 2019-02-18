const cheerio = require('cheerio')
const request = require('request')
let Restos=[];

function fillRestaurantsList() {
    return new Promise(function (resolve) {
        for (var j = 1; j < 36; j++) {
            const restos = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-' + j + '';
            request(restos, (error, response, html) => {
                if (!error && response.statusCode == 200) {
                    const home = cheerio.load(html);
                    home('div.poi_card-display-title').each((i, ele) => {
                        var a = "'";
                        var adder = home(ele).text().replace(/\s\s+/g, '');
                        console.log(a + adder + a);
                        //console.log(i);
                        Restos.push(i + ', ' + home(ele).text().trim());
                    });
                }
            });
            resolve(Restos);
        };
    });
}
fillRestaurantsList().then(console.log(Restos));