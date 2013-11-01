
var mongoose = require('mongoose');
var Song = mongoose.model('Song');

/*
 * GET /songs
 */

exports.index = function(req, res){
  Song.find(function(err, songs){
    res.render('songs/index', {title: 'Songs', songs: songs});
  });
};

/*
 * GET /songs/new
 */

exports.new = function(req, res){
  res.render('songs/new', {title: 'Add a Song'});
};

/*
 * Post /songs
 */

exports.create = function(req, res){
  console.log('before');
  console.log(req.body);
  req.body.genres = req.body.genres.split(', ');
  new Song(req.body).save(function(err, song, count){
    console.log('after');
    console.log(song);
    res.redirect('/songs');
  });
};