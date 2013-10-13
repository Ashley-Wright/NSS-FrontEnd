'use strict';

// Firebase Schema
var Δdb;
var Δbalance;
var Δstocks;
var Δquotes;

// Local Schema
var db = {};
db.balance = {};
db.balance.stock = 0;
db.stocks = [];
db.quotes = [];
var totals;


$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase('https://stock-market-amw.firebaseio.com/');
  $('#setButton').click(setFunds);
  $('#buyButton').click(purchase);
  $('#intervalButton').click(startUpdates);

  Δbalance = Δdb.child('balance');
  Δstocks = Δdb.child('stocks');
  Δquotes = Δdb.child('quotes');

  Δbalance.on('value', changeValue);
  Δstocks.on('child_added', stockAdded);
}

function changeValue(balance){
  balance = balance.val();

  if(!balance)
  {
    db.balance.cash = db.balance.stock = 0;
  } else {
    db.balance = balance;
  }
  printBalance();
}

function stockAdded(stock){
  stock = stock.val();
  db.stocks.push(stock);
  printAddStockRow(stock);
}

// function addStock(snapshot){
//   var stock = snapshot.val();
//   var symbol = stock.symbol;

//   requestQuote(symbol, function(data, textStatus, jqXHR){
//     var quote = data.Data;

//     stock.currentPrice = quote.LastPrice;
//     createRow(stock);
//   });
// }


function printAddStockRow(stock){
  var row = '<tr><td class="name"></td><td class="symbol"></td><td class="purchasedPrice"></td><td class="currentPrice"></td><td class="quantity"></td><td class="total"></td></tr>';
  var $row = $(row);
  $row.addClass(stock.symbol).addClass('stock');
  // console.log(stock);

  $row.children('.name').text(stock.name);
  $row.children('.symbol').text(stock.symbol);
  $row.children('.quantity').text(stock.quantity);
  $row.children('.purchasedPrice').text(dollarAmount(stock.purchasedPrice));
  if(!stock.currentPrice)
  {
    $row.children('.currentPrice').text(dollarAmount(stock.purchasedPrice));
    $row.children('.total').text(dollarAmount(stock.purchasedPrice * stock.quantity));
  } else {
    $row.children('.currentPrice').text(dollarAmount(stock.currentPrice));
    $row.children('.total').text(dollarAmount(stock.currentPrice * stock.quantity));
  }

  $('#stocks').append($row);
}

function setFunds() {
  var balance = $('#setFunds').val();
  db.balance.cash = parseFloat(balance);
  Δbalance.set(db.balance);
  $('#setFunds').val();
}

function purchase(){
  var symbol = $('#symbol').val();
  var quantity = $('#quantity').val();
  quantity = parseInt(quantity, 10);

  requestQuote(symbol, function(data, textStatus, jqXHR){
    var quote = data.Data;
    // console.log(quote);

    if(quote.LastPrice * quantity <= db.balance.cash){

      db.balance.cash -= quote.LastPrice * quantity;
      db.balance.stock += quote.LastPrice * quantity;
      Δbalance.set(db.balance);

      var stock = {};
      stock.symbol = symbol.toUpperCase();
      stock.name = quote.Name;
      stock.purchasedPrice = quote.LastPrice;
      stock.quantity = quantity;
      Δstocks.push(stock);
    }

    $('#symbol').val('');
    $('#quantity').val('');
    $('#symbol').focus();
  });
}

function startUpdates(){
  var delay = $('#delay').val();
  delay = parseFloat(delay, 10) * 1000;
  setInterval(getUpdatedQuotes, delay);
}


function getUpdatedQuotes(){
  for(var i = 0; i< db.stocks.length; i++){
    requestQuote(db.stocks[i].symbol, printUpdateStockRow);
  }
}

function printUpdateStockRow(data, textStatus, jqXHR) {
  var quote = data.Data;
  var selector = '.' + quote.Symbol;
  var quantity = $(selector).children('.quantity').text();
  quantity = parseInt(quantity, 10);
  var stockTotal = quote.LastPrice * quantity;

  $(selector).children('.currentPrice').text(dollarAmount(quote.LastPrice * 2));
  $(selector).children('.total').text(dollarAmount(stockTotal * 2));

  calculateNewStockTotals();
}

function calculateNewStockTotals(){
  var positions = $('.stock .total').text().split('$');
  var sum = 0;

  for(var i = 1; i < positions.length; i++){
    sum += parseFloat(positions[i]);
  }

  db.balance.stock = sum;
  printBalance();
  console.log('new');
}

function requestQuote(symbol, fn){
  var data = {symbol: symbol};
  $.getJSON('http://dev.markitondemand.com/Api/Quote/jsonp?callback=?', data, fn);
}

function dollarAmount(number){
  return '$' + number.toFixed(2);
}

function printBalance() {
  $('#cash').val(dollarAmount(db.balance.cash));
  $('#stock').val(dollarAmount(db.balance.stock));
  $('#total').val(dollarAmount(db.balance.cash + db.balance.stock));
}