'use strict';

// // Firebase Schema
// var Δdb;

// // Local Schema (defined in keys.js)
var results = [];

$(document).ready(initialize);

function initialize(fn, flag){
  if(!canRun(flag)) {return;}

  $(document).foundation();
  $('#calculate').click(clickCalculate);
  $('#history').on('click', '.button', clickRemove);
  $('#sum').click(clickSum);
  $('#product').click(clickProduct);
  $('#removeNegatives').click(clickRemoveNegatives);
}

function clickCalculate(){
  var op1 = getValue('#op1', parseInt);
  var op2 =  getValue('#op2', parseInt);
  var operator = getValue('#operator');
  var computation = op1 + operator + op2;
  var result = eval(computation);
  results.push(result);
  htmlUpdateResult(result);
  htmlUpdateHistory(op1, op2, operator, result);
}

function clickRemove(){
  var $remove = $(this);
  $remove.parent().remove();
}

function clickSum(){
  var sum = 0;
  for(var i = 0; i < results.length; i++)
  {
    sum += results[i];
  }
  htmlUpdateSum(sum);
}

function clickProduct(){
  var product = 1;
  for(var i = 0; i < results.length; i++)
  {
    product *= results[i];
  }
  htmlUpdateProduct(product);
}

function clickRemoveNegatives(){
  var negatives = _.filter(results, function(num){ return num < 0;});
  console.log(negatives);
  var $rows = $('#history li');
  console.log($rows);
  console.log($rows.length);
  for(var i = 0; i < $rows.length; i++){
    debugger;
    if($rows[i].children[4] < 0){
      $rows[i].remove();
    }
  }
}

function htmlUpdateResult(result){
  $('#result').text(result);
}

function htmlUpdateHistory(op1, op2, operator, result){
  var $li = $('<li>');

  var $op1 = $('<span>');
  $op1.addClass('op1');
  $op1.text(op1);

  var $op2 = $('<span>');
  $op2.addClass('op2');
  $op2.text(op2);

  var $operator = $('<span>');
  $operator.addClass('operator');
  $operator.text(operator);

  var $equal = $('<span>');
  $equal.addClass('equal');
  $equal.text('=');

  var $result = $('<span>');
  $result.addClass('result');
  $result.text(result);

  var $remove = $('<input>');
  $remove.attr('type', 'button').attr('value', 'x');
  $remove.addClass('button');
  $remove.addClass('tiny');

  $li.append($op1, $operator, $op2, ' ', $equal, ' ', $result, $remove);
  $('#history ul').prepend($li);
}

function htmlUpdateSum(sum){
  $('#output').text('Sum: ' + sum);
}

function htmlUpdateProduct(product){
  $('#output').text('Product: ' + product);
}

// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //

function canRun(flag){
  var isQunit = $('#qunit').length > 0;
  var isFlag = flag !== undefined;
  var value = isQunit && isFlag || !isQunit;
  return value;
}

function getValue(selector, fn){
  var value = $(selector).val();
  value = value.trim();
  $(selector).val('');

  if(fn){
    value = fn(value);
  }

  return value;
}

// function parseUpperCase(string){
//   return string.toUpperCase();
// }

// function parseLowerCase(string){
//   return string.toLowerCase();
// }

// function formatCurrency(number){
//   return '$' + number.toFixed(2);
// }

// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
