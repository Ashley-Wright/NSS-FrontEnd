function filter_evens(numbers)
{
  return _.filter(numbers, function(num){return (num % 2) == 0;});
}

function filter_odds(numbers)
{
  return _.filter(numbers, function(num){return (num % 2) == 1;});
}

function filter_short_strings(strings)
{
  return _.filter(strings, function(str){return str.length < 4;});
}

function filter_a_strings(strings)
{
  return _.filter(strings, function(str){return str[0] == 'a' || str[0] == 'A';});
  // could also use .toLowerCase() instead of ||
}

function find_string(strings, word)
{
  return _.find(strings, function(str){return str == word;});
}

function find_string_ending_letter(strings, letter)
{
  return _.find(strings, function(str){return str[str.length - 1] == letter;});
}