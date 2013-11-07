var mongoose = require('mongoose');


var Game = mongoose.Schema({
  player: String,
  numSquares: Number,
  time: {type: Number, default: 0},
  cardArray: [Number],
  createdAt: {type: Date, default: Date.now}
});


mongoose.model('Game', Game);