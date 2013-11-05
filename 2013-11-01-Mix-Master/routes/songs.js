
var mongoose = require('mongoose');
var Song = mongoose.model('Song');
var Genre = mongoose.model('Genre');

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
  Genre.find(function(err, genres){
    res.render('songs/new', {title: 'Add a Song', genres: genres});
  });
};

/*
 * Post /songs
 */

exports.create = function(req, res){
  new Song(req.body).save(function(err, song, count){
    if(err){
      Genre.find(function(error, genres){
        res.render('songs/new', {title: 'Express', errors: err.errors, genres: genres});
      });
    } else {
      res.redirect('/songs');
    }
  });
};

/*
 * GET /songs/:id
 */

exports.show = function(req, res){
  Song.findById(req.params.id).populate('genres').exec(function(err, song){
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

/*
 * Get /songs/:id/edit
 */

exports.edit = function(req, res){
  Song.findById(req.params.id).populate('genres').exec(function(err, song){
    Genre.find(function(error, genres){
      res.render('songs/edit', {title: 'Edit Song', song: song, genres: genres});
      console.log(genres);
    });
  });
};

/*
 * Put /songs/:id
 */

exports.update = function(req, res){
  Song.findByIdAndUpdate(req.params.id, req.body, function(err, song){
    res.redirect('/songs');
  });
};