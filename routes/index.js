var express = require('express');
var router = express.Router();
var request = require('request');
//var playsong = require('../sp_example_play_song');

var spotify_api_url = 'https://api.spotify.com/v1/search?';
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Busca tu cancion' });
});

router.post('/', function(req, res, next) {
  var query = req.body.query.replace(" ","+");

  var query_url = spotify_api_url + 'q=' + query + '&type=track&limit=1';
  request(query_url, function(err, response, body){
  	if(!err && response.statusCode == 200){
  		data = JSON.parse(body);

  		var track_uri = data.tracks.items[0].uri +"";

  		request('http://192.168.1.149:8080/?q='+track_uri, function(err2, response2, body2){});
  		
  	}	
  	else {
  		res.send(err)
  	}
  });  
  res.render('index', { 
  	title: 'Reproduciendo tu cancion',
  	song: query});
});

module.exports = router;
