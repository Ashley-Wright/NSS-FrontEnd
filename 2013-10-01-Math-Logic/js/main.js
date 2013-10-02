function range(num1) {
  var range_numbers = _.range(1, num1 + 1);
  return range_numbers;
}

function multi_array_items(array, multiplier) {
  var multiplied_range = [];
  for(i = 0; i < array.length; i++)
    multiplied_range.push(array[i] * multiplier);
  return multiplied_range;
}

function add_array_print(array) {
  var sum = 0;
  for(i = 0; i < array.length; i++)
    sum += array[i];
  var addition = array.join(' + ');
  return addition + ' = ' + sum;
}

$(document).ready(initialize);

function initialize() {
  $('#button').click(calculate);
}

function calculate() {
  var values = $('#values').val();
  var separate = values.split(', ');
  var num1 = parseInt(separate[0]);
  var num2 = parseInt(separate[1]);
  var to_be_multiplied = range(num1);
  var multiplied = multi_array_items(to_be_multiplied, num2);
  $('#result').val(add_array_print(multiplied));
}