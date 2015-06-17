var express = require('express');
var router = express.Router();

var firebase = require('firebase');
var ref = new firebase("https://rockolapp.firebaseio.com");

/* POST routes */
router.post('/new', function(req, res, next){
	//var track_uri = req.body.track_uri

	console.log(req.body.track_uri)
	var new_song = {
		track_uri: req.body.track_uri,
		name: req.body.name,
		artist: req.body.artist,
		img_url: req.body.img_url
	}
	ref.push(new_song)

	res.send("Agregada")

});

/* GET routes */
router.get('/', function(req, res, next) {

	var result_playlist = {playlist:[]}
	var playlists_track = {}

	ref.once("value", function(snapshot) {
		var track_uris = []

		for(var track in snapshot.val()){
			//var track_uri = snapshot.val()[track].track_uri

			playlists_track.track_uri = snapshot.val()[track].track_uri
			
			playlists_track.name = snapshot.val()[track].name
			playlists_track.artist = snapshot.val()[track].artist
			playlists_track.img_url = snapshot.val()[track].img_url
			result_playlist.playlist.push(playlists_track)

			playlists_track = {}
			
		}

		res.send(result_playlist);
	});

  
});

module.exports = router;
