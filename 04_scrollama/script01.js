// defining variables just for convenience of being able to stuff without having to select everything anew each time
var main = d3.select("main")
var scrolly = main.select("#scrolly");
var figure = d3.select("figure")
var svg = d3.select("#visualization")
var article = scrolly.select("article");
var step = article.selectAll(".step");

// initialize the scrollama
var scroller = scrollama();

// generic window resize listener event: we need this to resize our content when we resize our browser window
function handleResize() {
  var figureHeight = window.innerHeight - 100
  var figureMarginTop = (window.innerHeight - figureHeight) -50

  figure
    .style("height", figureHeight + "px")
    .style("top", figureMarginTop + "px");

  // tell scrollama to update new element dimensions
  scroller.resize();
}

// scrollama event handlers

///handleStepEnter: what should happen if we enter a Step?
function handleStepEnter(response) {
  // response = { element, direction, index }


  // add color to current step only
  step.classed("is-active", function (d, i) {
    return i === response.index;
  })
      }


///handleStepExit: what should happen if we exit a Step?
function handleStepExit(response) {
  // response = { element, direction, index }
  console.log("exit", response);
  // remove color from current step
//	response.element.classList.remove("is-active");
}



///handleStepExit: what should happen during a step between Enter and Exit?
function handleStepProgress(response) {
  console.log(response)
  console.log(response.progress)


}





function setupStickyfill() {
  d3.selectAll(".sticky").each(function () {
    Stickyfill.add(this);
  });
}


///general setup: interesting for you here will be mainly offset and debug
function init() {
  setupStickyfill();

  // 1. force a resize on load to ensure proper dimensions are sent to scrollama
  handleResize();

  // 2. setup the scroller passing options
  // 		this will also initialize trigger observations
  // 3. bind scrollama event handlers (this can be chained like below)
  scroller.setup({
    step: "#scrolly article .step",
    offset: 0.2,
    progress: true,
    debug: true,
  })
  .onStepEnter(handleStepEnter)
  .onStepProgress(handleStepProgress)
  .onStepExit(handleStepExit)



  // setup resize event
  window.addEventListener("resize", handleResize);
}

// kick things off
init();
