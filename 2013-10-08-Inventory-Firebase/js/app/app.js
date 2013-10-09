'use strict';

var Δdb;
var Δitems;
var items;

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#add').click(add);
  $('#save').click(save);
  Δdb = new Firebase('https://inventory-amw.firebaseio.com/');
  Δitems = Δdb.child('items');

  Δdb.on('value', receivedDbData);
}

function receivedDbData(snapshot) {
  console.log('receivedDbData has been called');
  var inventory = snapshot.val();
  $('#person').val(inventory.fullName);
  $('#address').val(inventory.address);

  if(inventory.items){
    console.log('yes there are items');
    items = inventory.items;
    printItems();
  } else {
    console.log('no there are no items');
    items = [];
  }
}

function printItems(){

  $('#items').children().children('.task').remove();
  var row = '<tr><td class="name"></td><td class="count"></td><td class="cost"></td><td class="room"></td><td class="condition"></td><td class="date"></td></tr>';

  for(var i = 0; i < items.length; i++)
  {
    if (items[i]){
      var $row = $(row);
      $row.addClass('task');
      $row.children('.name').text(items[i].name);
      $row.children('.count').text(items[i].count);
      $row.children('.cost').text(items[i].value);
      $row.children('.room').text(items[i].room);
      $row.children('.condition').text(items[i].condition);
      $row.children('.date').text(items[i].date);
      $('#items').append($row);
    }
  }
}

function save(){
  var fullName = $('#person').val();
  var address = $('#address').val();
  var inventory = {};
  inventory.fullName = fullName;
  inventory.address = address;

  Δdb.update(inventory);
}

function add(){
  var name = $('#name').val();
  var count = $('#count').val();
  var cost = $('#cost').val();
  var room = $('#room').val();
  var condition = $('#condition').val();
  var date = $('#date').val();

  var item = {};
  item.name = name;
  item.count = count;
  item.value = cost;
  item.room = room;
  item.condition = condition;
  item.date = date;

  items.push(item);
  Δitems.set(items);
}
