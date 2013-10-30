'use strict';

// Firebase Schema
var Δdb;
var Δpositions;

// Local Schema (defined in keys.js)
db.positions = [];
db.path = [];

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase(db.keys.firebase);
  initMap(36, -86, 5);

  Δpositions = Δdb.child('positions');
  Δpositions.remove();
  Δpositions.on('child_added', dbPositionAdded);
  $('#start').click(clickStart);
  $('#erase').click(clickErase);
  $('#stop').click(clickStop);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function dbPositionAdded(snapshot){
  var position = snapshot.val();
  var latLng = new google.maps.LatLng(position.latitude, position.longitude);

  db.positions.push(position);
  db.path.push(latLng);

  if(db.positions.length === 1){
    htmlAddStartIcon(latLng);
    htmlInitializePolyLine();
  }

  db.path.push(latLng);
  db.marker.setPosition(latLng);
  htmlSetCenterAndZoom(latLng);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function clickStart(){
  db.positions = [];
  var geoOptions = {
    enableHighAccuracy: true,
    maximumAge        : 1000,
    timeout           : 60000
  };

  db.watchId = navigator.geolocation.watchPosition(geoSuccess, geoError, geoOptions);
}

function clickErase(){
  Δpositions.remove();
  db.positions = [];
  db.path = [];
}

function clickStop(){
  navigator.geolocation.clearWatch(db.watchId);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function htmlAddStartIcon(latLng){
  var image = '/img/computer.png';
  db.marker = new google.maps.Marker({map: db.map, position: latLng, icon: image});
  // htmlSetCenterAndZoom(latLng);
}

function htmlInitializePolyLine(){
  var polyLine = new google.maps.Polyline({
    map: db.map,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  db.path = polyLine.getPath();
}

function htmlSetCenterAndZoom(latLng){
  db.map.setCenter(latLng);
  db.map.setZoom(18);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function initMap(lat, lng, zoom){
  var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
  db.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function geoSuccess(location) {
  var position ={};
  position.latitude = location.coords.latitude;
  position.longitude = location.coords.longitude;
  position.altitude = location.coords.altitude || 0;
  position.time = moment().format('MMMM Do YYYY, h:mm:ss a');

  Δpositions.push(position);
}

function geoError() {
  console.log('Sorry, no position available.');
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
