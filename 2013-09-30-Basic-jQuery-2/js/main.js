$(document).ready(initialize);



function initialize() {
  $('#button1').click(change_green);
  $('#name_btn').click(char_count);
}

function change_green()
{
  $('#green').css('background-color', 'green');
}

function char_count()
{
  var char_length = $('#name_txt').val();
  $('#name_div').text((char_length).length);
}