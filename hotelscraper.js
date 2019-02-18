const request = require('request')
const cheerio = require('cheerio')
const url='https://www.relaischateaux.com/fr/site-map/etablissements';
var hotels = [];
/*var getHotels=function(url){
    return new Promise(function(resolve,reject){
    })
}


	/*await request('https://www.relaischateaux.com/fr/site-map/etablissements',(error, response, html)=> {
    
		var $ = cheerio.load(html);
	  
		$('#countryF').find("h3:contains('France')").parent().find('.listDiamond > li').each( function (index, value) {
			urls.push($(this).find("a").first()[0].attribs.href);	
			});
	});
*/
request(url, (error,response,html)=>{
    if(!error && response.statusCode==200)
    {
        const home = cheerio.load(html);
        //console.log(home);
        home('#countryF').find("h3:contains('France')").parent().find('.listDiamond > li').each( function (i, element) {
        var pusher=home(this).find("a").first()[0].attribs.href
            console.log(i+1)
            console.log(pusher)
            hotels.push(pusher)
        });
    }
})

module.exports=hotels;