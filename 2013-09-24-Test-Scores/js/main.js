
var scores = [];

for(i = 1; i <= 10; i++)
{
  var response = prompt("Student " + i + "'s test score");
  response = parseFloat(response);
  scores.push(response);
}

console.log(scores);

var sum = 0

for(i = 0; i <= scores.length - 1; i++)
  sum += scores[i];


var avg = sum / scores.length;

console.log(avg);

var mean_diff = [];

for(i = 0; i <= scores.length - 1; i++)
  mean_diff.push(Math.pow((scores[i] - avg),2));


console.log(mean_diff);

sum = 0

for(i = 0; i <= mean_diff.length - 1; i++)
  sum += mean_diff[i];

console.log(sum);

var sdv = Math.sqrt(sum / mean_diff.length);

console.log(sdv);