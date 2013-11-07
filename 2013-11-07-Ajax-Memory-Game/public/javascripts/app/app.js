$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#game').on('submit', submitNewGame);
}

function submitNewGame(e){
  var url = $(this).attr('action');
  var data = {};
  data.player = $('input[name="player"]').val();
  data.numSquares = $('input[name="squares"]').val();
  sendGenericAjaxRequest(url, data, 'post', null, e, function(data, status, jqXHR){
    console.log(data);
  });
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