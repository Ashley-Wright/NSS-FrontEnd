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
}

function setFunds() {
  var balance = $('#setFunds').val();
  balance = parseFloat(balance);

  Δbalance.set(balance);
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
    stock.quantity = quantity;
    Δstocks.push(stock);

    $('#symbol').val('');
    $('#quantity').val('');
  });
}

function requestQuote(symbol, fn){
  var data = {symbol: symbol};
  $.getJSON('http://dev.markitondemand.com/Api/Quote/jsonp?callback=?', data, fn);
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




