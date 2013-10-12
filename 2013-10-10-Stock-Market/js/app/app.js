'use strict';

// Firebase Schema
var Δdb;
var Δbalance;
var Δstocks;
var Δquotes;

// Local Schema
var db = {};
db.balance = [];
db.balance.cash = 0;
db.balance.bought = 0;
db.balance.stocks = 0;
// db.balance.total = 0;
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

  Δbalance.on('value', changeValue);
  Δstocks.on('child_added', addStock);
}

function changeValue(snapshot){
  var balance = snapshot.val();
  if(balance)
  {
    db.balance = balance;
    // db.balance.total = db.balance.cash - db.balance.bought + db.balance.stocks;
    $('#balance').text(dollarAmount(db.balance.total));
  }
}

function addStock(snapshot){
  var stock = snapshot.val();
  var symbol = stock.symbol;

  requestQuote(symbol, function(data, textStatus, jqXHR){
    var quote = data.Data;

    stock.currentPrice = quote.LastPrice;
    createRow(stock);
  });
}

function createRow(stock) {
  var row = '<tr><td class="name"></td><td class="symbol"></td><td class="purchasedPrice"></td><td class="currentPrice"></td><td class="quantity"></td><td class="total"></td></tr>';
  var $row = $(row);
  console.log(stock);

  var name = stock.name;
  var symbol = stock.symbol;
  var purchasedPrice = stock.purchasedPrice;
  var currentPrice = stock.currentPrice;
  var quantity = stock.quantity;
  var total = stock.currentPrice * stock.quantity;

  $row.children('.name').text(name);
  $row.children('.symbol').text(symbol);
  $row.children('.purchasedPrice').text(purchasedPrice);
  $row.children('.currentPrice').text(currentPrice);
  $row.children('.quantity').text(quantity);
  $row.children('.total').text(total);

  db.balance.stocks += total;
  Δbalance.set(db.balance);
  console.log(db.balance);

  $('#stocks').append($row);
}

function setFunds() {
  var balance = $('#setFunds').val();
  db.balance.cash = parseFloat(balance);
  db.balance.total = db.balance.cash - db.balance.bought + db.balance.stocks;

  $('#balance').text(dollarAmount(db.balance.total));
  Δbalance.set(db.balance);

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

    db.balance.bought += stock.purchasedPrice * quantity;
    db.balance.total = db.balance.cash - db.balance.bought + db.balance.stocks;
    Δbalance.set(db.balance);

    $('#symbol').val('');
    $('#quantity').val('');
  });
}

function requestQuote(symbol, fn){
  var data = {symbol: symbol};
  $.getJSON('http://dev.markitondemand.com/Api/Quote/jsonp?callback=?', data, fn);
}

function dollarAmount(number){
  return '$' + number.toFixed(2);
}
