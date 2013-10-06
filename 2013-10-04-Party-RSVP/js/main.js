
'use strict';

$(document).ready(initialize);

function initialize() {
  $('#add').focus();
  $('#add').click(addRow);
  $('table').on('click', '.rsvp', rsvp);
  $('table').on('click', '.nukeButton', nuke);
  $('table').on('click', '.up, .down', upDown);
}

function upDown() {
  var $button = $(this);
  var $tr = $button.closest('tr');
  var $prevTR = $tr.prev();
  var $nextTR = $tr.next();
  if($button.attr('class') === 'up' && $prevTR.attr('id') !== 'headings')
  {
    $tr.detach();
    $prevTR.before($tr);
  }
  if($button.attr('class') === 'down' && $nextTR.length !== 0)
  {
    $tr.detach();
    $nextTR.after($tr);
  }
}

function nuke() {
  var $button = $(this);
  var $tr = $button.closest('tr');
  $tr.remove();
}

function rsvp() {
  var $button = $(this);
  var $textbox = $button.prev();
  var text = $textbox.val();
  var items = text.split(', ');
  var name = items[0];
  var food = items[1];
  var $nameTD = $button.parent().siblings('.name');
  $nameTD.text(name);
  var $foodTD = $button.parent().siblings('.food');
  $foodTD.text(food);
  $('#add').focus();
}


function addRow() {
  // Columns
  var $tr = $('<tr>');
  var $name = $('<td>');
  $name.addClass('name');
  var $food = $('<td>');
  $food.addClass('food');
  var $ctrl = $('<td>');
  $ctrl.addClass('ctrl');
  var $nuke = $('<td>');
  $nuke.addClass('nuke');
  var $upDown = $('<td>');
  $upDown.addClass('arrow');

  // In the Control Column
  var $input = $('<input>');
  $input.attr('type', 'text');

  var $button = $('<input>');
  $button.attr('type', 'button');
  $button.val('RSVP');
  $button.addClass('rsvp');

  $ctrl.append($input, $button);

  // In the Nuke Column
  var $nukeButton = $('<input>');
  $nukeButton.attr('type', 'button');
  $nukeButton.val('Nuke!');
  $nukeButton.addClass('nukeButton');
  $nuke.append($nukeButton);

  // In the Up/Down Column
  var $up = $('<img>');
  $up.attr('src', 'images/up_arrow.png');
  $up.addClass('up');
  var $down = $('<img>');
  $down.attr('src', 'images/down_arrow.png');
  $down.addClass('down');
  $upDown.append($up, $down);

  // Place in Table
  $tr.append($name, $food, $ctrl, $nuke, $upDown);
  $('table').append($tr);

  $input.focus();
}