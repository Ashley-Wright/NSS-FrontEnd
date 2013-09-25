

// p1 = {x: 7, y: 9};
// p2 = {x: 3, y: 6};

var points = [];

for(var i = 1; i <= 2; i++)
{
  var point = {};
  point.x = parseFloat(prompt("Point " + i + "'s x value"));
  point.y = parseFloat(prompt("Point " + i + "'s y value"));
  points.push(point);
}

console.log(points);

var a = points[0].y - points[1].y;
var b = points[0].x - points[1].x;
console.log(a);
console.log(b);

var distance = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
console.log(distance);