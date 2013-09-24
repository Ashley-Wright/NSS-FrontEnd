
// var name = prompt("What is your name?");
// var balance = prompt("What is your initial balance?");
// balance = parseFloat(balance);


var name = prompt("What is your name?");
var initial_balance = prompt("What is your initial balance?");
initial_balance = parseFloat(initial_balance);


// Deposits
var first_deposit = prompt("What is your first deposit?");
first_deposit = parseFloat(first_deposit);
var second_deposit = prompt("What is your second deposit?");
second_deposit = parseFloat(second_deposit);
var third_deposit = prompt("What is your third deposit?");
third_deposit = parseFloat(third_deposit);

var deposit = first_deposit + second_deposit + third_deposit;


// Withdraws
var first_withdraw = prompt("What is your first withdraw?");
first_withdraw = parseFloat(first_withdraw);
var second_withdraw = prompt("What is your second withdraw?");
second_withdraw = parseFloat(second_withdraw);
var third_withdraw = prompt("What is your third withdraw?");
third_withdraw = parseFloat(third_withdraw);

var withdraw = first_withdraw + second_withdraw + third_withdraw;


// Balance
balance = initial_balance + deposit - withdraw;


// Print
console.log("Hi " + name);
console.log("You have deposited " + deposit);
console.log("You have withdrawed " + withdraw);
console.log("Your balance is " + balance);

// Check for overdraft
if(balance < 0.00)
{
  balance += -50.00;
  console.log("A $50 overdraft fee has been added to your balance");
  console.log("Your balance is now " + balance);
}

