'use strict';

var accountBalance = 0;

$(document).ready(initialize);

function initialize() {
  $('#logo_url').focus();
  $('#logo_button').click(setLogo);
  $('#balance_button').click(setBalance);
  $('#deposit').click(addDeposit);
  $('#withdraw').click(addWithdraw);
  $('#deposit_list ul').on('click', 'li', reverseDeposit);
}

function setLogo() {
  var url = $('#logo_url').val();
  $('#logo').attr('src', url);
  $('#logo_url').val('');
  $('#enter_balance').focus();
}

function setBalance() {
  var balance = $('#enter_balance').val();
  accountBalance = parseInt(balance, 10);
  $('#balance').text(dollarAmount(accountBalance));
  $('#enter_balance').val('');
  $('#amount').focus();
}

function addDeposit() {
  var amount = $('#amount').val();
  amount = parseInt(amount, 10);
  accountBalance += amount;
  $('#balance').text(dollarAmount(accountBalance));
  $('#amount').val('');
  $('#amount').focus();
  var $li = $('<li>');
  $li = $('<li>' + dollarAmount(amount) + '</li>');
  $li.addClass('green');
  $('#deposit_list').append($li);
}

function addWithdraw() {
  var amount = $('#amount').val();
  amount = parseInt(amount, 10);
  accountBalance -= amount;
  $('#balance').text(dollarAmount(accountBalance));
  $('#amount').val('');
  $('#amount').focus();
  var $li = $('<li>');
  $li = $('<li>' + dollarAmount(amount) + '</li>');
  $li.addClass('red');
  $('#withdraw_list').append($li);
}

function reverseDeposit() {

}




function dollarAmount(amount) {
  return '$' + amount + '.00';
}