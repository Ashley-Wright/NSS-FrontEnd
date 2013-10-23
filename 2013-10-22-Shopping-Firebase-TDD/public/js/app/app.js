'use strict';

// Firebase Schema
var Δdb;
var Δproducts;

// Local Schema (defined in keys.js)
db.products = [];

$(document).ready(initialize);

function initialize(fn, flag){
  $(document).foundation();
  initializeDatabase();
  turnHandlersOn();
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function initializeDatabase(){
  Δdb = new Firebase(db.keys.firebase);
  Δproducts = Δdb.child('products');
  Δproducts.on('child_added', dbProductAdded);
}

function turnHandlersOn(){
  $('#add-product').on('click', clickAddProduct);
}

function turnHandlersOff(){
  $('#add-product').off('click');
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function clickAddProduct(){
  var image = getValue('#product-image');
  var name = getValue('#product-name');
  var weight = getValue('#product-weight', parseFloat);
  var price = getValue('#product-price', parseFloat);
  var off = getValue('#product-off', parseFloat);

  var product = new Product(image, name, weight, price, off);
  delete product.salePrice;
  Δproducts.push(product);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function Product(image, name, weight, price, off){
  this.image = image;
  this.name = name;
  this.weight = weight;
  this.price = price;
  this.off = off;
  this.salePrice = function(){return this.price - ((this.price * (this.off * Math.pow(10, -2))));};
}


// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function dbProductAdded(snapshot){
  var obj = snapshot.val();
  var product = new Product(obj.image, obj.name, obj.weight, obj.price, obj.off);
  product.id = snapshot.name();

  db.products.push(product);
  htmlUpdateProduct(product);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function htmlUpdateProduct(product){
  var $tr = $('<tr>');

  var $image = $('<td>');
  var $img = $('<img>');
  var url = '/img/' + product.image;
  console.log(url);
  $img.attr('scr', url);
  $image.append($img);
  $image.addClass('product-image');

  var $name = $('<td>');
  $name.text(product.name);
  $name.addClass('product-name');

  var $weight = $('<td>');
  $weight.text(product.weight.toFixed(1));
  $weight.addClass('product-weight');

  var $price = $('<td>');
  $price.text(formatCurrency(product.price));
  $price.addClass('product-price');

  var $off = $('<td>');
  $off.text(product.off + '%');
  $off.addClass('product-off');

  var $sale = $('<td>');
  $sale.text(formatCurrency(product.salePrice()));
  $sale.addClass('product-sale');

  $tr.append($image, $name, $weight, $price, $off, $sale);
  $('#products').append($tr);
}


// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function getValue(selector, fn){
  var value = $(selector).val();
  value = value.trim();
  $(selector).val('');

  if(fn){
    value = fn(value);
  }

  return value;
}

function parseUpperCase(string){
  return string.toUpperCase();
}

function parseLowerCase(string){
  return string.toLowerCase();
}

function formatCurrency(number){
  return '$' + number.toFixed(2);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
