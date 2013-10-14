'use strict';

// Firebase
var Δdb;
var Δbalance;
var Δstocks;
var Δphotos;

// Local
var db = {};
db.stocks = [];
db.photos = [];


$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase('https://stock-market-graph-amw.firebaseio.com/');
  Δbalance = Δdb.child('balance');
  Δstocks = Δdb.child('stocks');
  Δphotos = Δdb.child('photos');

  $('#setButton').click(setFunds);
  $('#buyButton').click(buyStock);
  // $('#graph').on('click', '.button', sellStock);

  Δbalance.on('value', balanceChanged);
  // Δstocks.once('value', getStocks);
  Δstocks.on('child_added', stockAdded);
}

function getStocks(stocks){
  var stocks = stocks.val();
  var stock = {};
  console.log(db.stocks);
  for(stock in stocks)
  {
    console.log(stocks[stock]);
    db.stocks.push(stocks[stock]);
    console.log(db.stocks);
  }
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
    // console.log(quote);

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
      searchFlickr(stock.name);
    }
  });
}

function requestQuote(symbol, fn){
  var data = {symbol: symbol};
  $.getJSON('http://dev.markitondemand.com/Api/Quote/jsonp?callback=?', data, fn);
}

function searchFlickr(name) {
  // console.log(name);
  var API_KEY = '1411583a1240294777887d50472970a0';
  var PER_PAGE = 1;
  var page = 1;

  var query = name;
  var url = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + API_KEY + '&text=' + query + '&per_page=' + PER_PAGE + '&page=' + page + '&format=json&jsoncallback=?';
  $.getJSON(url, function(data){
    // console.log(data);
    var photo = data.photos.photo[0];
    var url = 'url(http://farm'+ photo.farm +'.static.flickr.com/'+ photo.server +'/'+ photo.id +'_'+ photo.secret +'_m.jpg)';
    var photo = {};
    photo.name = name;
    photo.url = url;
    // console.log(db.photos.url);
    // console.log(db.photos.name);

    Δphotos.push(photo);
    db.photos.push(photo);
    // console.log(db.photos);
  });
}

// function results(data){
  // createImage(data.photos.photo);
  // var url = 'url(http://farm'+ photo.farm +'.static.flickr.com/'+ photo.server +'/'+ photo.id +'_'+ photo.secret +'_m.jpg)';
  // for(var i = 0; i < data.photos.photo.length; i++) {
  //   createImage(data.photos.photo[i]);
  // }
// }

// function createImage(photo){
//   var url = 'url(http://farm'+ photo.farm +'.static.flickr.com/'+ photo.server +'/'+ photo.id +'_'+ photo.secret +'_m.jpg)';

// }


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
    // console.log(height);

    $color.css('height', height + 'px');
    $noColor.css('height', empty + 'px');

    var $button = $('<input>');
    $button.attr('type', 'button').attr('value', 'Sell');
    $button.addClass('button');
    $button.addClass('small');

    var $img = $('<img>');
    var stockName = db.stocks[stock].name;
    // console.log(db.photos);s
    // console.log(db.photos.photo);
    // for(var i = 0; i < db.photos.length; i++)
    // {
    //   console.log(db.photos[i]);
    //   if(db.photos[i].name === stockName){
    //     var url = db.photos.url;
    //   }
    // }
    // console.log(url);
    $img.attr('src', '#');

    $wrap.append($noColor);
    $wrap.append($color);
    $wrap.append($img);
    $wrap.append($button);
    $('#graph').append($wrap);
  }
}

// function sellStock(){
//   var sell = $(this);

// }