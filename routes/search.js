var express = require('express');
var router = express.Router();
var request = require('request');
var url = require('url');
var spotify_api_url = 'https://api.spotify.com/v1/search?q=';

//https://api.spotify.com/v1/search?q=katy+perry&type=artist,track,album&limit=10

/* GET search listing. */
router.get('/', function(req, res, next){ 

	var search_result = {results:[]}

	var parsedUrl = url.parse(req.url, true);
	var queryAsObject = parsedUrl.query;
	var query = queryAsObject.query.replace(" ","+");
	console.log(query)

	var query_url = spotify_api_url+query+'&type=artist,track,album&limit=10';

	console.log(query_url)
	request(query_url, function(err, response, body){
		if(!err && response.statusCode == 200){
			data = JSON.parse(body);

			//var track_uri = data.tracks.items[0].uri +"";
			var items = data.tracks.items;
			var result = {}

			for(var i=0; i<items.length; i++){
				result.img_url = data.tracks.items[i].album.images[0].url
				result.name = data.tracks.items[i].name
				result.artist = data.tracks.items[i].artists[0].name
				result.track_uri = data.tracks.items[i].uri
				search_result.results.push(result)
				result = {}
			} 

			res.send(search_result);
			
		}else{
			search_result = err
			res.send(search_result);
		}
	});  

	
});

module.exports = router;
