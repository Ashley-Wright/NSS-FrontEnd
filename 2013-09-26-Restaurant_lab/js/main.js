
function catagory(x)
{
  for(i = 0; i < menu_items.length; i++)
  {
    if(menu_items[i].type == x)
    {
      console.log(menu_items[i].name + " (" + menu_items[i].ingredients + ") $" + menu_items[i].price);
    }
  }
}


var menu_items = [];

var response = prompt("Name of item");

while(response)
{
  var menu_item = {};
  menu_item.name = response;
  menu_item.type = prompt("Catagory");
  menu_item.price = parseFloat(prompt("Price"));
  menu_item.cal = parseFloat(prompt("Calories"));
  menu_item.ingredients = [];
  menu_item.ing = (prompt("Ingredients"));
  while(menu_item.ing)
  {
    menu_item.ingredients.push(menu_item.ing);
    menu_item.ing = prompt("Ingredients");
  }
  menu_items.push(menu_item);
  response = prompt("Name of item");
}

var catagories = [];
catagories.push(menu_items[0].type);
for(i = 1; i < menu_items.length; i++)
{
  for(j = 0; j < catagories.length; j++)
  {
    if(menu_items[i].type == catagories[j])
    {
      break;
    }
    else
    {
      catagories.push(menu_items[i].type);
    }
  }
}

for(j = 0; j < catagories.length; j++)
{
  console.log(catagories[j]);
  catagory(catagories[j]);
}

var calories = 0
var total_cost = 0
for(i = 0; i < menu_items.length; i++)
{
  calories += menu_items[i].cal;
  total_cost += menu_items[i].price;
}
var avg_cost = (total_cost / menu_items.length);
var avg_calories = (calories / menu_items.length);

console.log("The number of items on the menu: " + menu_items.length);
console.log("The number of sections: " + catagories.length);
console.log("The total calories: " + calories);
console.log("The average calorie count: " + avg_calories);
console.log("The total cost: " + total_cost);
console.log("The average cost: " + avg_cost);
