//Takes a selector and return a selection representing all the elements that match the selector
var circle = d3.selectAll("circle");

//2.Selecting Elements
circle.style("fill","steelblue");
circle.attr("r",30);

//2A.Anonimous functions to compute attribute values
//Run the code multiple times to make the circles dance!
circle.attr("cx",function() {return Math.random() * 720;});

//2B.Binding data
//Data is specified as an array of data, one element of the array is called "Datum"
circle.data([32,57,112]);
//Data are accessible as the first argument to attribute style and attribute functions.
//We tipically use the name d to refer to bound data
circle.attr("r", function(d) {return Math.sqrt(d);});

//Another possible argument is i, the index of the element within its selection
circle.attr("cx", function(d,i) {return i * 100 + 30;});

///////

//3. Entering Elements
var svg = d3.select("svg");

var circle = svg.selectAll("circle")
      .data([32,57,112,293]);
//Adding one element by entering the selection computed by a data join. We are creating a circle for
//the missing data, without having to draw it manually in the svg
var circleEnter = circle.enter().append("circle");

circleEnter.attr("cy", 60);
circleEnter.attr("cx", function(d,i) {return i * 100 + 30;});
circleEnter.attr("r", function(d) {return Math.sqrt(d);});

//The structure of this data join is very common: selectAll + data + enter + append
// svg.selectAll("circle")
//     .data([43,65,200,290])
//   .enter().append("circle")
//     .attr("cx", function(d,i) {return i * 100 + 30;})
//     .attr("r", function(d) {return Math.sqrt(d);});


//4.Exiting Elements
//To remove exceeding elements you can use exit(), this is the mirror of enter
var circle = svg.selectAll("circle")
        .data([32,57]);

circle.exit().remove();

//5. All together!
//SelectAll return an empty selection
var circle = svg.selectAll("circle")
//This selection is joined by an array of data, by writing console.log you will notice that selection.data returns
      .data([32,57,293], function(d) {return d ;});
      console.log(circle);

circle.enter().append("circle")
    .attr("cy",60)
    .attr("cx", function(d,i) {return i * 100 + 30;})
    .attr("r", function(d) {return Math.sqrt(d);});

circle.exit().remove();
