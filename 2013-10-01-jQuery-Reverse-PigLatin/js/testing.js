
test("pig_latin", function() {
  deepEqual(pig_latin('hello, nashville, code'), 'elloha, ashvillena, odeca', "Translate hello to elloha")
});

test("reverse", function() {
  deepEqual(reverse('hello, nashville, code'), 'code; nashville; hello', "Reverse the array")
});