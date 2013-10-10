'use strict';

var timer = 0;

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#start').click(start);
  $('#stop').click(stop);
}

function start(){
  var time = $('#speed').val();
  var delay = parseFloat(time) * 1000;
  timer = setInterval(createBox, delay);
}

function createBox(){
  var dimensions = $('#dimensions').val();
  var values = dimensions.split(', ');
  var width = parseInt(values[0], 10);
  var height = parseInt(values[1], 10);
  var color = getColor();

  var $div = $('<div>');
  $div.addClass('box');
  $div.css('width', width).css('height', height).css('background-color', color);
  $('#colors').append($div);
}

function getColor(){
  var red = Math.floor(Math.random()*256);
  var green = Math.floor(Math.random()*256);
  var blue = Math.floor(Math.random()*256);
  return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
}

function stop(){
  clearInterval(timer);
}