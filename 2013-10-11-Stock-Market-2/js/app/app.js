'use strict';

// Firebase
var Δdb;
var Δbalance;
var Δstocks;

// Local
var db = {};
db.stocks = [];


$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase('https://stock-market-graph-amw.firebaseio.com/');
  Δbalance = Δdb.child('balance');
  Δstocks = Δdb.child('stocks');

  $('#setButton').click(setFunds);
  $('#buyButton').click(buyStock);

  Δbalance.on('value', balanceChanged);
  Δstocks.on('child_added', stockAdded);
}

function balanceChanged(balance){
  balance = balance.val();
  if(!balance)
  {
    db.balance = 0
  } else {
    db.balance = balance.toFixed(2);
  $('#funds').val('$' + balance);
  }
}

function setFunds(){
  var funds = $('#funds').val();
  funds = parseFloat(funds, 10);
  db.balance = funds;
  Δbalance.set(funds);
}

function buyStock(){
  var symbol = $('#symbol').val();
  var quantity = $('#quantity').val();
  quantity = parseInt(quantity, 10);

  requestQuote(symbol, function(data, textStatus, jqXHR){
    var quote = data.Data;
    console.log(quote);

    if(quote.LastPrice * quantity <= db.balance)
    {
      db.balance -= quote.LastPrice * quantity;
      Δbalance.set(db.balance);

      var stock = {};
      stock.symbol = symbol.toUpperCase();
      stock.name = quote.Name;
      stock.quantity = quantity;
      stock.price = quote.LastPrice;

      Δstocks.push(stock);
    }
  });
}

function requestQuote(symbol, fn){
  var data = {symbol: symbol};
  $.getJSON('http://dev.markitondemand.com/Api/Quote/jsonp?callback=?', data, fn);
}

function stockAdded(stock){
  stock = stock.val();
  db.stocks.push(stock);
  console.log(db.stocks);

  // makeBarGraph();
}

// function makeBarGraph(){
//   _.max(db.stocks)
// }