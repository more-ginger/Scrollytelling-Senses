var circle = d3.selectAll("circle")

circle.style("fill", "steelblue")
circle.style("stroke", "red")
circle.attr("r", 30)

//circle.attr("cx", d => {return Math.random() * 700})

var dataOne = [33, 57, 112]

circle.data(dataOne)
circle.attr("r", d => {return Math.sqrt(d)})

circle.attr("cx", function(d,i) {return i * 100 + 30})
