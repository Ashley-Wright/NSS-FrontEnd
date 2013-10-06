'use strict';

$(document).ready(initialize);

function initialize() {
  $('#dueDate').focus();
  $('#addTask').click(addTask);
  $('table').on('click', '.checkbox', done);
  $('table').on('click', '.delete', remove);
  $('table').on('click', '.up, .down', upDown);
}

function addTask() {
  var $tr = $('<tr>');

  var $dueDate = $('<td>');
  $dueDate.text($('#dueDate').val());

  var $task = $('<td>');
  $task.text($('#task').val());
  $task.addClass('task');

  var $color = $('<td>');
  var $colorBox = $('<div>');
  $colorBox.addClass('colorBox');
  $colorBox.css('background-color', $('#color').val());
  $color.append($colorBox);

  var $done = $('<td>');
  var $doneCheck = $('<input>');
  $doneCheck.attr('type', 'checkbox');
  $doneCheck.addClass('checkbox');
  $done.append($doneCheck);

  var $remove = $('<td>');
  var $removeButton = $('<input>');
  $removeButton.attr('type', 'button');
  $removeButton.attr('value', 'Delete');
  $removeButton.addClass('delete');
  $remove.append($removeButton);

  var $upDown = $('<td>');
  var $up = $('<img>');
  $up.attr('src', 'images/up_arrow.png');
  $up.addClass('up');
  var $down = $('<img>');
  $down.attr('src', 'images/down_arrow.png');
  $down.addClass('down');
  $upDown.append($up, $down);

  $tr.append($dueDate, $task, $color, $done, $remove, $upDown);
  $('table').append($tr);
  $('#dueDate').focus();
}

function done() {
  var $checkbox = $(this);
  var $task = $checkbox.parent().siblings('.task');
  var $row = $checkbox.closest('tr');
  if($checkbox.prop('checked') === true)
  {
    $task.css('text-decoration', 'line-through');
    $row.css('background-color', 'grey');
  }
  if($checkbox.prop('checked') === false)
  {
    $task.css('text-decoration', 'none');
    $row.css('background-color', 'transparent');
  }
}

function remove() {
  var $remove = $(this);
  var $row = $remove.closest('tr');
  $row.remove();
}

function upDown() {
  var $button = $(this);
  var $row = $button.closest('tr');
  var $prevRow = $row.prev('tr');
  var $nextRow = $row.next('tr');
  if($button.attr('class') === 'up' && $prevRow.attr('id') !== 'heading')
  {
    $row.detach();
    $prevRow.before($row);
  }
  if($button.attr('class') === 'down'  && $nextRow.length !== 0)
  {
    $row.detach();
    $nextRow.after($row);
  }
}