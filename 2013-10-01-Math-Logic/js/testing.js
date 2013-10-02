test("range", function() {
  deepEqual(range(5), [1, 2, 3, 4, 5], "Range 1 to 5");
  deepEqual(range(6), [1, 2, 3, 4, 5, 6], "Range 1 to 6");
});

test("multi_array_items", function() {
  deepEqual(multi_array_items([1, 2, 3, 4, 5], 3), [3, 6, 9, 12, 15], "Multiply range 1 to 5 by 3");
});

test("add_array_print", function() {
  deepEqual(add_array_print([1, 2, 3, 4, 5]), "1 + 2 + 3 + 4 + 5 = 15", "Add numbers in the array and print string");
});