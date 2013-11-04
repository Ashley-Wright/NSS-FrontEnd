
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
  req.body.genres = req.body.genres.split(', ');
  new Song(req.body).save(function(err, song, count){
    res.redirect('/songs');
  });
};

/*
 * GET /songs/:id
 */

exports.show = function(req, res){
  Song.findById(req.params.id, function(err, song){
    res.render('songs/show', {title: 'Song', song: song});
  });
};

/*
 * Delete /songs/:id
 */

exports.delete = function(req, res){
  Song.findByIdAndRemove(req.params.id, function(err, song){
    res.redirect('/songs');
  });
};