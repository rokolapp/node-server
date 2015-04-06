var express = require('express');
var router = express.Router();
var playsong = require('../sp_example_play_song');

/* GET home page. */
router.get('/', function(req, res, next) {
  playsong();
  res.render('index', { title: 'Express' });
});

module.exports = router;
