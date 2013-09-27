
function area(width, length)
{
  return width * length;
}

var rooms = [];

var name = prompt("Enter a Room Name or blank");

while(name)
{
  var room = {};
  room.name = name;
  room.width = parseFloat(prompt("Width of Room"));
  room.length = parseFloat(prompt("Length of Room"));
  room.window = parseFloat(prompt("Number of Windows"));
  rooms.push(room);
  name = prompt("Enter a Room Name or blank");
}

var total_rooms = rooms.length;
console.log("Your total number of rooms: " + total_rooms);

var total_win = 0
var total_sqft = 0

for(i = 0; i < rooms.length; i++)
{
  total_win += rooms[i].window;
  total_sqft += area(rooms[i].width,rooms[i].length);
}
console.log("Your total number of windows: " + total_win);
console.log("Your total number of square feet: " + total_sqft);

var windows_cost = total_win * 250.00;
var sqft_cost = total_sqft * 200.00;
var total = windows_cost + sqft_cost;
console.log("Windows cost equals " + windows_cost);
console.log("Square footage cost equals " + sqft_cost);
console.log("Total cost equals " + total);


