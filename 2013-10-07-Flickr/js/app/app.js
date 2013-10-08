'use strict';

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#search').click(searchFlickr);
  $('#photos').on('dblclick', '.photo', removePhoto);
  $('#photos').on('click', '.photo', selectPhoto);
  $('#clear').click(removeSearch);
  $('#clearSelected').click(removeSelected);
  $('#saveSelected').click(saveSelected);
}

function searchFlickr() {
  var API_KEY = '1411583a1240294777887d50472970a0';
  var PER_PAGE = 10;
  var page = 1;

  var query = $('#query').val();
  var url = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + API_KEY + '&text=' + query + '&per_page=' + PER_PAGE + '&page=' + page + '&format=json&jsoncallback=?';
  $.getJSON(url, results);
}

function results(data){
  for(var i = 0; i < data.photos.photo.length; i++) {
    createImage(data.photos.photo[i]);
  }
}

function createImage(photo){
  var url = 'url(http://farm'+ photo.farm +'.static.flickr.com/'+ photo.server +'/'+ photo.id +'_'+ photo.secret +'_m.jpg)';
  var $div = $('<div>');
  $div.addClass('photo');
  $div.css('background-image', url);
  $('#photos').prepend($div);
}

function removePhoto(){
  $(this).remove();
}

function selectPhoto(){
  $(this).toggleClass('select');
}

function removeSearch(){
  $('#photos').empty();
}

function removeSelected(){
  $('.select').remove();
}

function saveSelected(){
  var $photo = $('.select');
  $photo.removeClass('select');
  $('#saved-photos').prepend($photo);
}