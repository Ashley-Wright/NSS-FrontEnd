'use strict';

// Firebase Schema
var Δdb;
var Δbalance;
var Δstocks;
var Δquotes;

// Local Schema
var db = {};
db.balance = 0;
db.stocks = [];
db.quotes = [];

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase('https://stock-market-amw.firebaseio.com/');
  $('#setButton').click(setFunds);
  $('#buyButton').click(purchase);

  Δbalance = Δdb.child('balance');
  Δstocks = Δdb.child('stocks');
  Δquotes = Δdb.child('quotes');

  Δstocks.once('value', addStocks);
  Δstocks.on('child_added', addStocks);
}

function addStocks(snapshot){
  var stocks = snapshot.val();
  console.log(stocks);
  var stock = [];
  for (stock in stocks)
  {
    var row = '<tr><td class="name"></td><td class="symbol"></td><td class="purchasedPrice"></td><td class="currentPrice"></td><td class="quantity"></td><td class="total"></td></tr>';
    var $row = $(row);

    var name = stocks[stock].name;
    var symbol = stocks[stock].symbol;
    var purchasedPrice = stocks[stock].purchasedPrice;
    var quantity = stocks[stock].quantity;

    $row.children('.name').text(name);
    $row.children('.symbol').text(symbol.toUpperCase());
    $row.children('.purchasedPrice').text(dollarAmount(purchasedPrice));
    $row.children('.quantity').text(quantity);

    $('#stocks').append($row);
  }
}

function setFunds() {
  var balance = $('#setFunds').val();
  balance = parseFloat(balance);

  Δbalance.set(balance);
  $('#balance').text(dollarAmount(balance));
}

function purchase(){
  var symbol = $('#symbol').val();
  var quantity = $('#quantity').val();
  quantity = parseInt(quantity, 10);

  requestQuote(symbol, function(data, textStatus, jqXHR){
    var quote = data.Data;
    console.log(quote);

    var stock = {};
    stock.symbol = symbol;
    stock.name = quote.Name;
    stock.purchasedPrice = quote.LastPrice;
    stock.quantity = quantity;
    Δstocks.push(stock);

    db.balance -= stock.purchasedPrice * quantity;
    $('#balance').text(dollarAmount(db.balance));

    $('#symbol').val('');
    $('#quantity').val('');
  });
}

function requestQuote(symbol, fn){
  var data = {symbol: symbol};
  $.getJSON('http://dev.markitondemand.com/Api/Quote/jsonp?callback=?', data, fn);
}

function dollarAmount(number){
  return '$' + number;
}




// function buyStock(){
//   var symbol = $('#symbol').val();
//   var quantity = $('#quantity').val();
//   quantity = parseInt(quantity, 10);
//   var stock = {};
//   stock.symbol = symbol;
//   stock.quantity = quantity;
//   Δstocks.push(stock);
//   getStockQuote();
// }

// function receivedQuote(data, textStatus, jqXHR){
//   var rowInfo = {};
//   console.log(data);
//   rowInfo.name = data.name;
//   debugger;
// }




