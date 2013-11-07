$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#game').on('submit', submitGame);
  $('.cup').on('click', clickCup);
}

//------------------------------------------------//
//------------------------------------------------//
//------------------------------------------------//

function submitGame(e){
  var url = $(this).attr('action') + '?player=' + $('input[name="player"]').val();
  sendGenericAjaxRequest(url, {}, 'post', null, e, function(data, status, jqXHR){
    htmlStartGame(data);
  });
}

function clickCup(){
  var guess = $(this).data('position');
  var gameId = $('#cups').data('id');
  var url = '/games/' + gameId;
  sendGenericAjaxRequest(url, {guess:guess}, 'post', 'put', null, function(data, status, jqXHR){
    console.log(data.didWin);
  });
}

function htmlStartGame(game){
  $('input[name="player"]').val('');
  $('#cups h3.subheader').text(game.player);
  $('#cups').show();
  $('#cups').attr('data-id', game._id);
}


function sendGenericAjaxRequest(url, data, verb, altVerb, event, successFn){
  var options = {};
  options.url = url;
  options.type = verb;
  options.data = data;
  options.success = successFn;
  options.error = function(jqXHR, status, error){console.log(error);};

  if(altVerb) options.data._method = altVerb;
  $.ajax(options);
  if(event) event.preventDefault();
}
