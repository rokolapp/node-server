var playsong = function ('response_url')
{

	var lame = require('lame'),
		Speaker = require('speaker'),
		fs = require('fs'),
		Spotify = require('spotify-web');

	var url = response_url || 'spotify:track:1ZBAee0xUblF4zhfefY0W1';

	var username = '12156614669',
		password = 'Getinhalo4';

	Spotify.login(username,password, function(err,spotify){
		if (err) throw err;
		//Get a track instance
		spotify.get(url, function(err,track){
			if (err) throw err;
			console.log('Playing %s - %s', track.artist[0].name, track.name);
			
			//play() return a readable stream of mp3 audio data
			track.play()
			.pipe(new lame.Decoder())
			.pipe(new Speaker())
			.on('finish', function(){
				spotify.disconnect();
				console.log('bye')
			});

		});
	});
}

module.exports = playsong;