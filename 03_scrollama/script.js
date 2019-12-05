// using d3 for convenience
var main = d3.select('main')
var scrolly = main.select('#scrolly');
var figure = scrolly.select('figure');
var article = scrolly.select('article');
var step = article.selectAll('.step');

// initialize scrollama
var scroller = scrollama();

// generic window resize listener event
function handleResize() {
  // 1. update height of step elements
  var stepH = Math.floor(window.innerHeight * 0.75);
  step.style('height', stepH + 'px');

  // 2. update dimensions of figure element
  var figureHeight = window.innerHeight / 1.2
  var figureMarginTop = (window.innerHeight - figureHeight) / 2

  figure
    .style('height', figureHeight + 'px')
    .style('top', figureMarginTop + 'px');

  // 3. tell scrollama to update new element dimensions
  scroller.resize();
}

////////////////////////////////////////////////////////////////////////////////
// Scrollama event handlers
////////////////////////////////////////////////////////////////////////////////

function handleStepEnter(response) {
  // response = { element, direction, index }

  // add color to current step only
  step.classed('is-active', function (d, i) {
    return i === response.index;
  })

  // update figure based on step
  switch(response.index) {
    case 0:
      removeFigureContent();
      showImage();
      break;
    case 1:
      removeFigureContent();
      showAnimatedGif();
      break;
    case 2:
      removeFigureContent(false);
      showBarChart();
      break;
    case 3:
      removeFigureContent(false);
      showProgressBar();
      break;
    default:
      console.log('nothing todo at step ' + (response.index + 1));
  }
}

function handleStepProgress(response) {
  // response = { element, index, progress }

  // update progress bar for each progress update
  updateProgressBar(response.progress);
}

////////////////////////////////////////////////////////////////////////////////
// Functions to show contents of different steps
////////////////////////////////////////////////////////////////////////////////

function showImage() {
  // Add html image element to figure.
  figure
    .append('img')
    .attr('src', 'img/image1.jpg')
    .attr('width', '100%')
    .attr('height', '100%')
    // add opacity and transition to fade in image
    .style('opacity', 0)
    .transition()
    .duration(1000)
    .style('opacity', 1)
}

function showAnimatedGif() {
  // Add html image element to figure.
  figure.append('img')
    .attr('src', 'img/image2.gif')
    .attr('width', '100%')
    .attr('height', '100%')
    // add opacity and transition to fade in image
    .style('opacity', 0)
    .transition()
    .duration(1000)
    .style('opacity', 1)
}

function showBarChart() {
  // Define some basic values.
  var barHeight = 40;
  var chartWidth = 400;
  var barSpacing = 4;
  var data = [14, 94, 12, 64, 85];

  var chartHeight = data.length * barHeight + (data.length - 1) * barSpacing

  // Create scale to map data to chart width.
  var scale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, chartWidth])

  // Add root svg object
  var svg = figure.append('svg')
    .attr('width', '100%')
    .attr('height', '100%')

  // Add wrapper graph to svg to move graph around.
  var chartWrapper = svg.append('g')
    .attr('transform', 'translate(20, 30)')

  // Add wrapper object for each value in the data array.
  // Each bar in the bar chart has its own wrapper.
  var barWrapper = chartWrapper.selectAll('g')
    // Bind the data array and add g-element for each value with enter().
    .data(data)
    .enter()
    // The following lines are executed for each data value without g-element.
    // (so basically for all of them, because chartWrapper is newly created and empty)
    .append('g')
    .attr('transform', function(d, i) {
      var yPosition = i * (barHeight + barSpacing);
      return 'translate(0, ' + yPosition + ')'
    })

  // Add a rect as 'bar' and scale the width based on array value.
  barWrapper.append('rect')
    .attr('height', barHeight)
    .attr('width', function(d, i) {
      return scale(d)
    })
    .attr('fill', 'black')
    // Add index as ref to the object to make mouse interactions easier.
    .attr('ref', function(d, i) { return i })
    .attr('class', 'bar')
    .on('mouseover', function() {
      var bar = d3.select(this)
      // Change bar color on mouse over
      bar.attr('fill', 'darkblue')
      // Select text object for this bar and change font color.
      d3.select('.bar' + bar.attr('ref')).attr('fill', 'white')
    })
    // Same for mouse out action.
    .on('mouseout', function() {
      var bar = d3.select(this)
      d3.select(this).attr('fill', 'black')
      d3.select('.bar' + bar.attr('ref')).attr('fill', 'lightgrey')
    })

  // Add text label for each bar.
  barWrapper.append('text')
    .attr('fill', 'lightgrey')
    // dx and dy are relative offsets for the x and y position.
    .attr('dy', barHeight - 10)
    .attr('dx', 8)
    // This is an alternative notation for 'function(d) { return d; }'
    .text((d) => { return d; })
    .attr('class', (d, i) => { return 'bar' + i; })

  // Create an axis object to add to the bar chart
  var chartAxis = d3.axisBottom()
    .scale(scale);

  // Add translated g element and add chart axis to it.
  chartWrapper.append('g')
    .style('font-size', '14px')
    .attr('transform', 'translate(0, ' + (chartHeight + barSpacing / 2) + ')')
    .call(chartAxis);
}

function showProgressBar() {
  // Add root svg object
  var svg = figure.append('svg')
    .attr('width', '100%')
    .attr('height', '100%')

  // Add underlying progress bar goal shape
  var progressGoalBar = svg.append('rect')
    .attr('x', '50px')
    .attr('y', '50px')
    .attr('height', '20px')
    .attr('width', '800px')
    .style('fill', 'white')

  // Add progress bar with width=0px to update it later
  var progressBar = svg.append('rect')
    .attr('x', '50px')
    .attr('y', '50px')
    .attr('height', '20px')
    .attr('width', '0px')
    .style('fill', 'black')
    .attr('class', 'progress-bar')
}

////////////////////////////////////////////////////////////////////////////////
// Helper Functions
////////////////////////////////////////////////////////////////////////////////

function removeFigureContent(animated = true) {
  var objects = figure.selectAll('*')

  // Remove content animated or directly based on animated variable
  if (animated) {
    // fade out current figure content
    objects
      .classed('fading-out', true)
      .transition().duration(1000).style('opacity', 0)
      // remove object when animation is finished
      .on('end', function() {
        figure.selectAll('.fading-out').remove();
      });
  } else {
    objects.remove();
  }
}

// Add all sticky objects to JavaScript library Stickfill
// if css sticky is not supported by the browser.
function setupStickyfill() {
  d3.selectAll('.sticky').each(function () {
    Stickyfill.add(this);
  });
}

function setupBarChartAction() {
  // Select action link by its id.
  d3.select('#bar-chart-action')
    .on('click', () => {
      // Prevent default link action.
      d3.event.preventDefault();

      // Change fill to random color.
      var randomColor = getRandomColor();
      figure.selectAll('.bar')
        .attr('fill', randomColor)
    })
}

function getRandomColor() {
  // Build rgb value of color step by step
  var randomColor = '#';
  // Add three color values
  for (var i=0; i<3; i++) {
    // Get color component value and convert it to hex based string
    var colorComponent = Math.round(Math.random() * 255).toString(16)
    // Add leading zero if color component has just one digit.
    if (colorComponent.length == 1) {
      colorComponent = '0' + colorComponent;
    }
    // Add color component to random color string
    randomColor = randomColor + colorComponent;
  }
  return randomColor
}

function updateProgressBar(progress) {
  // Get progress bar object by class name.
  var progressBar = figure.select('.progress-bar')
  // Create color scale to change progress bar color based on progress
  var progressBarColor = d3.scaleLinear()
    .domain([0, 1])
    .range(["black", "blue"])

  // Update progress bar width and fill color if it exists
  if ( !progressBar.empty() ) {
    progressBar
      .attr('width', (progress * 800) + 'px')
      .style("fill", progressBarColor(progress))
  }
}

////////////////////////////////////////////////////////////////////////////////
// Scrollama init
////////////////////////////////////////////////////////////////////////////////

function init() {
  setupStickyfill();
  setupBarChartAction();

  // 1. force a resize on load to ensure proper dimensions are sent to scrollama
  handleResize();

  // 2. setup the scroller passing options
  // 		this will also initialize trigger observations
  // 3. bind scrollama event handlers (this can be chained like below)
  scroller.setup({
    step: '#scrolly article .step',
    offset: 0.6,
    debug: false,
    progress: true
  })
  .onStepEnter(handleStepEnter)
  .onStepProgress(handleStepProgress)

  // setup resize event
  window.addEventListener('resize', handleResize);
}

// kick things off
init();
