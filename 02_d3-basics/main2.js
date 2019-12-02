// 433708
var dataOne = [50, 50, 50]
var dataTwo = [54, 76, 49, 55, 90, 91]
var dataThree = [5, 10, 11]



var svg = d3.select("svg")
var circle = svg.selectAll("circle")
      .data(dataTwo)

var circleEnter = circle.enter().append("circle")
circleEnter.attr("cy", 60)
circleEnter.attr("cx", function(d,i) {return i * 100 + 30;});
circleEnter.attr("r", function(d) {return Math.sqrt(d);});

var circle = svg.selectAll("circle")
  .data(dataThree)

circle.exit().remove()
