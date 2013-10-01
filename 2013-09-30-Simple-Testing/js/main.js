function add_three(x)
{
  return x + 3;
}

function square(n)
{
  return n*n;
}

function area(length, width)
{
  return length * width;
}

function volume(length, width, height)
{
  return area(length, width) * height;
}

function power(base, exp)
{
  var product = 1;
  for(i = 0; i < exp; i++)
    product *= base;
  return product;
}

function greeting(salutation, name)
{
  return salutation + ", " + name + "!";
}

function pig_latin(string)
{
  return string.slice(1) + string[0] + "a";
}

function pig_greeting(salutation, name)
{
  return pig_latin(salutation) + ", " + pig_latin(name) + "!";
}

function pig_sentence(string)
{
  var words =  string.split(' ');
  var sentence = [];
  for(i = 0; i < words.length; i++)
    sentence.push(pig_latin(words[i]));
  return sentence.join(" ");
}