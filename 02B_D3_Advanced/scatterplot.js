var dataset = [[5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
              [410, 12], [475, 44], [25, 67], [85, 21], [220, 88], [600, 150]];


//Dimensionen festlegen

var margin = {top: 60, right: 60, bottom: 60, left: 60};
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;


//SVG erstellen
var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);

//Gruppe für Margin erstellen

var g = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Scale-Funktionen erstellen
//x-Position
var x = d3.scaleLinear()
  .domain([0, d3.max(dataset, function(d) { return d[0]; })])
  .range([0, width]);

//y-Position
var y = d3.scaleLinear()
  .domain([d3.max(dataset, function(d) { return d[1]; }),0])
  .range([height, 0]);

//Kreis-Größe
var radius = d3.scaleLinear()
  .domain([0, d3.max(dataset, function(d) { return d[1]; })])
  .range([2, 10]);

//Farbe
var color = d3.scaleLinear()
  .domain([0, d3.max(dataset, function(d) { return d[0]; })])
  .range(["red", "green"]);


//Kreise einfügen
g.selectAll("circle")
  .data(dataset)
  .enter()
  .append("circle")
  .attr("cx", function(d) {return x(d[0]);})
  .attr("cy", function(d) {return y(d[1]);})
  .attr("r", function(d) {return radius(d[1]);})
  .attr("fill", function(d) {return color(d[0])});

//Beschriftung einfügen
g.selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text(function(d) {return "x: " + d[0] + " / y: " + d[1];})
  .attr("x", function(d) {return x(d[0]); })
  .attr("y", function(d) { return y(d[1])- 1.5*radius(d[1]);})
  .attr("font-family", "sans-serif")
  .attr("font-size", "11px")
  .attr("fill", "black")
  .filter(function(d){return x(d[0] == 600)})
  .attr("text-anchor", "middle");


//y-Achse erstellen
g.append("g")
  .attr("class", "axis")
  .call(d3.axisLeft(y));

//x-Achse erstellen
g.append("g")
  .attr("class", "axis")
  .call(d3.axisTop(x));
