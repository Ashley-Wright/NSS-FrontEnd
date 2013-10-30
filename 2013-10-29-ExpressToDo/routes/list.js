
var database = require('../modules/database.js');

/*
 * GET list page.
 */

exports.index = function(req, res){
  var items = database.read(__dirname + '/../db/items.json');
  res.render('list/index', { title: 'To Do | List', items: items});
};

exports.new = function(req, res){
  res.render('list/new', { title: 'To Do | New'});
};

exports.create = function(req, res){
  var name = req.body.name;
  var due = req.body.due;
  var color = req.body.color;

  var items = database.read(__dirname + '/../db/items.json');
  var item = {color: color, name: name, due: due};
  items.push(item);
  database.write(__dirname + '/../db/items.json', items)

  res.redirect('list/');
};