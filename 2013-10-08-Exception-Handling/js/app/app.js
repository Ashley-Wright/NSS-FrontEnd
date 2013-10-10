'use strict';

$(document).ready(initialize);

function initialize(){
  $(document).foundation();

  try{
    console.log(b);
  } catch(e){
    console.log('you just received the error: ' + e);
  }

  console.log('I have reached the end of this function');

}
