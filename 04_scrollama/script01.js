// using d3 for convenience
var main = d3.select('main')
var scrolly = main.select('#scrolly');
var figure = d3.select("figure")
var svg = d3.select("#visualization")
var article = scrolly.select('article');
var step = article.selectAll('.step');

// initialize the scrollama
var scroller = scrollama();

// generic window resize listener event
function handleResize() {
  // 1. update height of step elements

  var figureHeight = window.innerHeight - 100
  var figureMarginTop = (window.innerHeight - figureHeight) -50

  figure
    .style('height', figureHeight + 'px')
    .style('top', figureMarginTop + 'px');


  // 3. tell scrollama to update new element dimensions
  scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response) {
  // response = { element, direction, index }


  // add color to current step only
  step.classed('is-active', function (d, i) {
    return i === response.index;
  })


      }



function handleStepExit(response) {
  // response = { element, direction, index }
  console.log('exit', response);
  // remove color from current step
//	response.element.classList.remove('is-active');
}


function handleStepProgress(response) {
  console.log(response)
  console.log(response.progress)


}





function setupStickyfill() {
  d3.selectAll('.sticky').each(function () {
    Stickyfill.add(this);
  });
}

function init() {
  setupStickyfill();

  // 1. force a resize on load to ensure proper dimensions are sent to scrollama
  handleResize();

  // 2. setup the scroller passing options
  // 		this will also initialize trigger observations
  // 3. bind scrollama event handlers (this can be chained like below)
  scroller.setup({
    step: '#scrolly article .step',
    offset: 0.2,
    progress: true,
    debug: true,
  })
  .onStepEnter(handleStepEnter)
  .onStepProgress(handleStepProgress)
  .onStepExit(handleStepExit)



  // setup resize event
  window.addEventListener('resize', handleResize);
}

// kick things off
init();
