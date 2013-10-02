
function pig_latin(string) {
  return string.slice(1) + string[0] + 'a';
}

function reverse_convert_pig_latin(sentence) {
  var words = sentence.split(', ');
  var reversed_words = words.reverse();
  for(i = 0; i < reversed_words.length; i++)
    reversed_words[i] = pig_latin(reversed_words[i]);
  var new_sentence = reversed_words.join('; ');
  return new_sentence;
}

$(document).ready(initialize);

function initialize() {
  $('#button').click(convert);
}

function convert() {
  var original = $('#original').val();
  var modified = reverse_convert_pig_latin(original);
  $('#result').val(modified);
}

