var colors = require('colors');
var mongoose = require('mongoose');
var Game = mongoose.model('Game');
var _ = require('lodash');
// Colors
// bold, italic, underline, inverse, yellow, cyan,
// white, magenta, green, red, grey, blue, rainbow,
// zebra, random

/*
 * GET /
 */

exports.index = function(req, res){
  console.log('games.index'.italic.underline.bold.magenta);
  res.render('games/index', {title: 'Memory Game'});
};

/*
 * Post /games/start
 */

exports.create = function(req, res){
  var game = new Game(req.body);
  var array1 = _.range(game.numSquares);
  var array2 = _.range(game.numSquares);
  var array = array1.concat(array2);
  array = _.shuffle(array);
  game.cardArray = array;

  var obj = {};
  obj.array = game.cardArray.length;

  game.save(function(err, game){
    res.send(obj);
  });
};
