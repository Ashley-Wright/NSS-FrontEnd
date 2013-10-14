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

  makeBarGraph();
}

function makeBarGraph(){
  var highestPriceStock = _.max(db.stocks, function(stock){return stock.price;});
  var highestPrice = highestPriceStock.price;
  var base = 400;
  $('#graph').empty();

  for(var stock in db.stocks)
  {
    var $wrap = $('<div>');
    $wrap.addClass('wrapper');

    var $noColor = $('<div>');
    var $color = $('<div>');
    var cls = db.stocks[stock].symbol;
    $wrap.addClass(cls);
    $color.addClass('bar');

    var height = (db.stocks[stock].price / highestPrice) * base;
    var empty = base - height;
    console.log(height);

    $color.css('height', height + 'px');
    $noColor.css('height', empty + 'px');

    var $button = $('<input>');
    $button.attr('type', 'button').attr('value', 'Sell');
    $button.addClass('button');
    $button.addClass('small');

    var $img = $('<img>');
    $img.attr('src', '#');

    $wrap.append($noColor);
    $wrap.append($color);
    $wrap.append($img);
    $wrap.append($button);
    $('#graph').append($wrap);
  }
}