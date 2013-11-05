
var mongoose = require('mongoose');
var Priority = mongoose.model('Priority');
var Todo = mongoose.model('Todo');

/*
 * GET /todos
 */

exports.index = function(req, res){
  Priority.find(function(priorityErr, priorities){
    Todo.find().populate('priority').exec(function(todoErr, todos){
      res.render('todos/index', {title: 'Express', priorities: priorities, todos: todos});
    });
  });
};

/*
 * POST /todos
 */

exports.create = function(req, res){
  new Todo(req.body).save(function(err, todo, count){
    Todo.findById(todo.id).populate('priority').exec(function(err, todo){
      res.send(todo);
    });
  });
};