
test("handle_deposits", function() {
  deepEqual(handle_deposits(1000.00, 250.00), 1250.00, "Deposit 250")
});

test("handle_withdraws", function() {
  deepEqual(handle_withdraws(1000.00, 250.00), 750.00, "Withdraw 250")
});