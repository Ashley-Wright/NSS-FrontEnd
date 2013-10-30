'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  initialize(null, true);
}

function teardownTest(){
}

test('Calculate 2 numbers', function(){
  expect(4);

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('*');
  $('#calculate').trigger('click');

  deepEqual($('#op1').val(), '', 'op1 should be blank');
  deepEqual($('#op2').val(), '', 'op2 should be blank');
  deepEqual($('#operator').val(), '', 'operator should be blank');
  deepEqual($('#result').text(), '6', 'result should be 6');
});

test('Paper Trail', function(){
  expect(13);

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('+');
  $('#calculate').trigger('click');

  deepEqual($('#history li').length, 1, 'number of list items');

  $('#op1').val('7');
  $('#op2').val('8');
  $('#operator').val('*');
  $('#calculate').trigger('click');

  deepEqual($('#history li').length, 2, 'number of list items');

  deepEqual($('#history li:first-child span').length, 5, 'number of spans');
  ok($('#history li:first-child span:first-child').hasClass, 'op1', 'should have class of op1');
  ok($('#history li:first-child span:nth-child(2)').hasClass, 'operator', 'should have class of operator');
  ok($('#history li:first-child span:nth-child(3)').hasClass, 'op2', 'should have class of op2');
  ok($('#history li:first-child span:nth-child(4)').hasClass, 'equal', 'should have class of equal');
  ok($('#history li:first-child span:nth-child(5)').hasClass, 'result', 'should have class of result');
  deepEqual($('#history li:first-child span:first-child').text(), '7', 'op1 7');
  deepEqual($('#history li:first-child span:nth-child(2)').text(), '*', 'op1 7');
  deepEqual($('#history li:first-child span:nth-child(3)').text(), '8', 'op1 7');
  deepEqual($('#history li:first-child span:nth-child(4)').text(), '=', 'op1 7');
  deepEqual($('#history li:first-child span:nth-child(5)').text(), '56', 'op1 7');
});


test('Remove history', function(){
  expect(4);

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('*');
  $('#calculate').trigger('click');

  $('#op1').val('7');
  $('#op2').val('8');
  $('#operator').val('+');
  $('#calculate').trigger('click');

  $('#op1').val('9');
  $('#op2').val('6');
  $('#operator').val('-');
  $('#calculate').trigger('click');

  $('#op1').val('60');
  $('#op2').val('6');
  $('#operator').val('/');
  $('#calculate').trigger('click');

  deepEqual($('#history li').length, 4, 'number of list items');
  deepEqual($('#history li:first-child span:first-child').text(), '60', 'first span should be 60');

  $('#history li:first-child .button').trigger('click');
  deepEqual($('#history li').length, 3, 'number of list items');
  deepEqual($('#history li:first-child span:first-child').text(), '9', 'first span should be 9');
});

test('Alternating Row Colors', function(){
  expect(5);

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('*');
  $('#calculate').trigger('click');

  $('#op1').val('7');
  $('#op2').val('8');
  $('#operator').val('+');
  $('#calculate').trigger('click');

  $('#op1').val('9');
  $('#op2').val('6');
  $('#operator').val('-');
  $('#calculate').trigger('click');

  deepEqual($('#history li:first-child').css('background-color'), 'rgb(128, 128, 128)', 'should be grey');
  deepEqual($('#history li:nth-child(2)').css('background-color'), 'rgba(0, 0, 0, 0)', 'should be white');
  deepEqual($('#history li:nth-child(3)').css('background-color'), 'rgb(128, 128, 128)', 'should be grey');

  $('#history li:first-child .button').trigger('click');

  deepEqual($('#history li:first-child').css('background-color'), 'rgb(128, 128, 128)', 'should be grey');
  deepEqual($('#history li:nth-child(2)').css('background-color'), 'rgba(0, 0, 0, 0)', 'should be white');
});

test('Sum Results', function(){
  expect(1);

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('*');
  $('#calculate').trigger('click');

  $('#op1').val('7');
  $('#op2').val('8');
  $('#operator').val('+');
  $('#calculate').trigger('click');

  $('#op1').val('9');
  $('#op2').val('6');
  $('#operator').val('-');
  $('#calculate').trigger('click');

  $('#sum').trigger('click');

  deepEqual($('#output').text(), 'Sum: 24', 'the sum should be 24');
});

test('Product Results', function(){
  expect(1);

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('*');
  $('#calculate').trigger('click');

  $('#op1').val('7');
  $('#op2').val('8');
  $('#operator').val('+');
  $('#calculate').trigger('click');

  $('#op1').val('9');
  $('#op2').val('6');
  $('#operator').val('-');
  $('#calculate').trigger('click');

  $('#product').trigger('click');

  deepEqual($('#output').text(), 'Product: 270', 'the product should be 270');
});

test('Remove Negative Results', function(){
  expect(5);

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('*');
  $('#calculate').trigger('click');

  $('#op1').val('7');
  $('#op2').val('8');
  $('#operator').val('-');
  $('#calculate').trigger('click');

  $('#op1').val('9');
  $('#op2').val('6');
  $('#operator').val('-');
  $('#calculate').trigger('click');

  deepEqual($('#history li:first-child .result').text(), '3', 'first span should be 9');
  deepEqual($('#history li:nth-child(2) .result').text(), '-1', 'first span should be 9');
  deepEqual($('#history li:nth-child(3) .result').text(), '6', 'first span should be 9');

  $('#removeNegatives').trigger('click');

  deepEqual($('#history li:first-child .result').text(), '3', 'first span should be 9');
  deepEqual($('#history li:nth-child(2) .result').text(), '6', 'first span should be 9');
});