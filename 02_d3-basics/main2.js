var dataOne = [143, 25, 187]
var dataTwo = [46, 59, 100, 200]
var dataThree = [54, 87]

var svg = d3.select("svg")

var width = 500
var x = d3.scaleLinear()
    .domain([0, d3.max(dataTwo)])
    .range([0, width])

svg.selectAll("circle")

    .data(dataTwo)
  .enter().append("circle")

  .attr("cx", function(d, i) {return i * 100 + 5})
  .attr("cy", 100)
  .attr("r", function(d) {return Math.sqrt(x(d));})
  .style("fill", "green")
//
// var circle = svg.selectAll("circle")
//   .data(dataThree)
//
// circle.exit().remove()
