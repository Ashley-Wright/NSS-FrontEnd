'use strict';

// Firebase Schema
var Δdb;
var Δproducts;
var Δcustomers;

// Local Schema (defined in keys.js)
db.products = [];
db.pagination = {};
db.pagination.perPage = 5;
db.pagination.currentPage = 1;
db.pagination.currentRowCount = 0;
db.customers = [];

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
  Δcustomers = Δdb.child('customers');

  Δproducts.on('child_added', dbProductAdded);
  Δcustomers.on('child_added', dbCustomerAdded);
}

function turnHandlersOn(){
  $('#add-product').on('click', clickAddProduct);
  $('#next').on('click', clickNavigation);
  $('#previous').on('click', clickNavigation);
  $('#add-customer').on('click', clickAddCustomer);
}

function turnHandlersOff(){
  $('#add-product').off('click');
  $('#next').off('click');
  $('#previous').off('click');
  $('#add-customer').off('click');
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

function clickNavigation(){
  db.pagination.currentRowCount = 0;
  $('.product-row').remove();

  var isPrevious = this.id === 'previous';
  db.pagination.currentPage += isPrevious ? -1 : +1;

  var startIndex = db.pagination.perPage * (db.pagination.currentPage - 1);
  var endLength = (startIndex + db.pagination.perPage) > db.products.length ? db.products.length : startIndex + db.pagination.perPage;
  var isLess = startIndex > 0;
  var isMore = db.products.length > endLength;

  htmlShowHideNavigation('#previous', isLess);
  htmlShowHideNavigation('#next', isMore);

  for(var i = startIndex; i < endLength; i++){
    htmlUpdateProduct(db.products[i]);
  }
}

function clickAddCustomer(){
  var image = getValue($('#customer-image'));
  var name = getValue($('#customer-name'));

  var isDomestic = $('input[name="address"]:checked').val() === 'domestic';

  var customer = new Customer(image, name, isDomestic);
  Δcustomers.push(customer);

  htmlResetRadioButtons();
  $('#customer-image').val('');
  $('#customer-name').val('');
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

function Customer(image, name, isDomestic){
  this.image = image;
  this.name = name;
  this.isDomestic = isDomestic;
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function dbProductAdded(snapshot){
  var obj = snapshot.val();
  var product = new Product(obj.image, obj.name, obj.weight, obj.price, obj.off);
  product.id = snapshot.name();

  db.products.push(product);
  if(db.pagination.currentRowCount < db.pagination.perPage){
    htmlUpdateProduct(product);
  } else {
    htmlShowHideNavigation('#next', true);
  }
}

function dbCustomerAdded(snapshot){
  var obj = snapshot.val();
  var customer = new Customer(obj.image, obj.name, obj.isDomestic);
  customer.id = snapshot.name();

  db.customers.push(customer);
  htmlAddCustomerToSelect(customer);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function htmlUpdateProduct(product){
  db.pagination.currentRowCount++;
  var $tr = $('<tr>');
  $tr.addClass('product-row');

  var $image = $('<td>');
  var $img = $('<img>');
  var url = '/img/' + product.image;
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

function htmlShowHideNavigation(selector, shouldShow){
  $(selector).removeClass('hidden');

  if(!shouldShow){
    $(selector).addClass('hidden');
  }
}

function htmlResetRadioButtons(){
  // $('input[name="address"]').each(function(index, dom){
  //   dom.checked = false;
  // });
  $('input[name="address"]:checked')[0].checked = false;
}

function htmlAddCustomerToSelect(customer){
  var $option = $('<option>');
  $option.val(customer.name);
  $option.text(customer.name);
  $('select#select-customer').prepend($option);
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
