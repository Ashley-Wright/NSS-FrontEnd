
function pig_latin(string) {
  return string.slice(1) + string[0] + 'a';
}

$(document).ready(initialize);

function initialize() {
  $('#pig').click(translate);
}

function translate() {
  var string = $('#text').val();
  $('#result').val(pig_latin(string));
}

// $('#pig').css('background-color', "lightblue");