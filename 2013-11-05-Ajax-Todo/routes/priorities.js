var mongoose = require('mongoose');
var Priority = mongoose.model('Priority');

/*
 * Post /priorites
 */

exports.create = function(req, res){
  new Priority(req.body).save(function(err, priority, count){
    res.send(priority);
  });
};