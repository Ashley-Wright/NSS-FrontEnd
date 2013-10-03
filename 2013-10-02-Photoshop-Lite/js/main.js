
$(document).ready(initialize);

function initialize() {
  $('#add_color').click(addColor)
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