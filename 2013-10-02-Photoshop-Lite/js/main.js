'use strict';

$(document).ready(initialize);

function initialize() {
  $('#add_color').click(addColor);
  $('#colors').on('click', '.box', colorPaletteClicked);
  $('#add_box').click(addBox);
  $('#boxes').on('mouseover', '.paintbox', canvasHover);
}

function canvasHover() {
  var $canvas = $(this);
  var brushColor = $('#brush').css('background-color');
  $canvas.css('background-color', brushColor);
}

function addBox() {
  var amount = $('#amount').val();
  amount = parseInt(amount, 10);
  for(var i = 0; i < amount; i++)
  {
    var $canvas = $('<div>');
    $canvas.addClass('paintbox');
    $('#boxes').append($canvas);
  }
}

function colorPaletteClicked() {
  var $box = $(this);
  var color = $box.css('background-color');
  $('#brush').css('background-color', color);
}

function addColor() {
  var $box = $('<div>');
  var color = $('#color').val();
  $box.addClass('box');
  $box.css('background-color', color);

  $('#colors').append($box);
  clearInputAndFocus();
}

function clearInputAndFocus() {
  $('#color').val('');
  $('#color').focus();
}