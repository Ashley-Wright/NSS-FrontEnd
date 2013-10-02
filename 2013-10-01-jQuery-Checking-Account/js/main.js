
function handle_deposits(balance, deposit){
  return balance + deposit;
}

function handle_withdraws(balance, withdraw){
  return balance - withdraw;
}

function test_total(total){
  if(total < 0)
    $('#balance').addClass('overdrawn');
  else
    $('#balance').removeClass('overdrawn');
}

$(document).ready(initialize);

function initialize(){
  $('#dep').click(get_deposit);
  $('#with').click(get_withdraw);
}

function get_deposit() {
  var balance = parseFloat($('#balance').val());
  var deposit = parseFloat($('#new_value').val());
  var total = handle_deposits(balance, deposit);
  test_total(total);
  $('#balance').val(total);
}

function get_withdraw() {
  var balance = parseFloat($('#balance').val());
  var withdraw = parseFloat($('#new_value').val());
  var total = handle_withdraws(balance, withdraw);
  test_total(total);
  $('#balance').val(total);
}