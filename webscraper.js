const request = require('request');
const cheerio = require('cheerio');

var Restos = []
count = 0;
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
	})
}
/*
$('.poi_intro-description opt-upper__intro-area').each(function(index,element){
	companiesList[index]={};
	var name=$(element).find('.poi_intro-dsiplay-stars opt-upper__stars-wrapper');
	console.log(name.text());
	var price=$(element).find('.poi_intro-display-prices');
	companiesList[index]['price']=$(price).text();
});
*/
module.exports = Restos;