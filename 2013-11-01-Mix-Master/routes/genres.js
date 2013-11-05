
var mongoose = require('mongoose');
var Song = mongoose.model('Song');
var Genre = mongoose.model('Genre');

/*
 * GET /genres
 */

exports.index = function(req, res){
  Genre.find(function(err, genres){
    res.render('genres/index', {title: 'Genres', genres: genres});
  });
};

/*
 * GET /genres/new
 */

exports.new = function(req, res){
  res.render('genres/new', {title: 'New Genre', genre: new Genre()});
};

/*
 * Post /genres
 */

exports.create = function(req, res){
  new Genre(req.body).save(function(err, genre, count){
    if(err){
      res.render('genres/new', {title: 'Express', errors: err.errors, genre: new Genre()});
    } else {
      res.redirect('/genres');
    }
  });
};

/*
 * Get /genres/:id/edit
 */

exports.edit = function(req, res){
  Genre.findById(req.params.id, function(err, genre){
    res.render('genres/edit', {title: 'Edit Genre', genre: genre});
  });
};

/*
 * Put /genres/:id
 */

exports.update = function(req, res){
  Genre.findByIdAndUpdate(req.params.id, req.body, function(err, genre){
    res.redirect('/genres');
  });
};

/*
 * GET /genres/:id
 */

exports.show = function(req, res){
  Genre.findById(req.params.id, function(err, song){
    res.render('genres/show', {title: 'Express', genre: genre});
  });
};

/*
 * Delete /genres/:id
 */

exports.delete = function(req, res){
  res.redirect('/genres');
};