//Takes a selector and return a selection representing all the elements that match the selector, here you are selecting the svg circles in the HTML file!
var circle = d3.selectAll("circle");

//Remove comments (//) from lines below to play around with D3 selections, joins and scales.

// //2.Selecting Elements means you can also edit them
// circle.style("fill","steelblue");
// circle.attr("r",30);
//
// //////////////////////////////////////////////////
// //2A.Anonimous functions to compute attribute values
// //////////////////////////////////////////////////
// //This function modify the "cx" attribute of each circle element by randomly compute a number. Run the code multiple times to make the circles dance!
// circle.attr("cx",function() {return Math.random() * 720;});
//
// //Time to bring data in!
// //Let's create some variables for data (We will use them later)
// var dataOne = [32,57,112]
// var dataTwo = [32,57,112,293]
// var dataThree = [32,57]
//
// //2B.Binding data
// //Data is specified as an array of values, one element of the array is called "Datum"
// circle.data(dataOne);
// //Data are accessible as the first argument to attribute style and attribute functions.
// //We tipically use the name d to refer to bound data
// circle.attr("r", function(d) {return Math.sqrt(d);});
//
// //Another possible argument is i, the index of the element within its selection
// circle.attr("cx", function(d,i) {return i * 100 + 30;});
//
// //////////////////////////////////////////////////
// //3. Entering Elements
// //////////////////////////////////////////////////
// //Let's select the svg container again and then all the circles to bind the second (longer) dataset
// var svg = d3.select("svg");
//
// var circle = svg.selectAll("circle")
//        .data(dataTwo);
//
// //Adding one element by entering the selection computed by a data join. We are creating a circle for
// //the missing data, without having to draw it manually in the svg
// var circleEnter = circle.enter().append("circle");
//
// circleEnter.attr("cy", 60);
// //Now "d" is data in dataTwo, because we binded a new dataset
// circleEnter.attr("cx", function(d,i) {return i * 100 + 30;});
// circleEnter.attr("r", function(d) {return Math.sqrt(d);});
//
// //The structure of this data join is very common: selectAll + data + enter + append
// svg.selectAll("circle")
//   data(dataTwo)
// .enter().append("circle")
//  .attr("cx", function(d,i) {return i * 100 + 30;})
//  .attr("r", function(d) {return Math.sqrt(d);});
//
//  //////////////////////////////////////////////////
// //4.Exiting Elements
// //////////////////////////////////////////////////
// //To remove exceeding elements you can use exit(), this is the mirror of enter. By binding the last (and shorter) dataset we can remove circles.
// var circle = svg.selectAll("circle")
//      .data(dataThree);
// circle.exit().remove();
//
// //////////////////////////////////////////////////
// //5. Scale!
// ////////////////////////////////////////////////
// var width = 500
// var x = d3.scaleLinear()
//     .domain([0, d3.max(dataTwo)])
//     .range([0, width]);
//
//
// ////////////////////////////////////////////////
// //6. All together!
// ////////////////////////////////////////////////
// var svg = d3.select("svg")
// var circle = svg.selectAll("circle")
//   //This selection is joined by an array of data, by writing console.log you will notice that selection.data returns _enter and _exit, while _enter has pending elements
//   //_enter is currently empty because there are no elements that need to be removed.
//         .data(dataTwo, function(d) {return d ;});
//
//     circle.enter().append("circle")
//         .attr("cy",60)
//         .attr("cx", function(d,i) {return i * 100 + 30;})
//         .attr("r", function(d) {return Math.sqrt(d);});
//
//     circle.exit().remove();
