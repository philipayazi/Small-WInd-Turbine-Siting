
url = "/allcities"

// ================================ table 
// Define SVG area dimensions
var svgWidth = 1300; //1440; //960;
var svgHeight = 500; //660;


// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 80, //30,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;


//// ================================ slider
var rangeslider = document.getElementById("sliderRange");
var output = document.getElementById("mySlider");
output.innerHTML = rangeslider.value;

d3.json(url).then(function (data) {
  console.log('orig json >>> ', data);
});

rangeslider.oninput = function () {
  output.innerHTML = this.value;
  console.log('slider value', output.innerHTML);
  var sliderValue = output.innerHTML;

  d3.json(url).then(function (data) {
    console.log('json', data);

    data.forEach(function (d) {
      d.mph_avg = +d.mph_avg;
      
      //d.mph = +d.mph;

      d.change_mph_avg = +d.change_mph_avg;
      d.change_mph_avg = Math.abs(d.change_mph_avg);

      d.change_deg_avg = +d.change_deg_avg;
      d.change_deg_avg = Math.abs(d.change_deg_avg);

      d.qualty = (d.mph_avg * sliderValue + (d.change_mph_avg + d.change_deg_avg) * (100.0 - sliderValue)/10);
      console.log('qualty >>> ', d.qualty);

    });


    d3.select("svg").remove()

    ////Select body, append SVG area to it, and set the dimensions
    var svg = d3.select("body")
      .append("svg")
      .attr("height", svgHeight)
      .attr("width", svgWidth);

    // Append a group to the SVG area and shift ('translate') it to the right and to the bottom
    var chartGroup = svg.append("g")
      .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);


    // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
    var xBandScale = d3.scaleBand()
      .domain(data.map(d => d.city))
      .range([0, chartWidth])
      .padding(0.1);

    // Create a linear scale for the vertical axis.
    var yLinearScale = d3.scaleLinear()
      // .domain([0, d3.max(tvData, d => d.hours)])
      .domain([0, 400])
      .range([chartHeight, 0]);

    // Create two new functions passing our scales in as arguments
    // These will be used to create the chart's axes
    var bottomAxis = d3.axisBottom(xBandScale);
    var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

    // Append two SVG group elements to the chartGroup area,
    // and create the bottom and left axes inside of them
    chartGroup.append("g")
      .call(leftAxis);

    chartGroup.append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(bottomAxis)
      // .attr("transform", 'rotate(-65)');
      // .attr("transform", "translate(" + gridSize / 2 + ", -6)rotate(-90)")
      .selectAll("text")
      .attr("y", 0)
      .attr("x", 9)
      .attr("dy", ".35em")
      .attr("transform", "rotate(90)")
      .style("text-anchor", "start");

    // Create one SVG rectangle per piece of tvData
    // Use the linear and band scales to position each rectangle within the chart
    chartGroup.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => xBandScale(d.city))
      .attr("y", d => yLinearScale(d.qualty))
      .attr("width", xBandScale.bandwidth())
      .attr("height", d => chartHeight - yLinearScale(d.qualty));


  });


}




// // Load data from hours-of-tv-watched.csv
// d3.csv("hours-of-tv-watched.csv").then(function(tvData) {

//   console.log(tvData);

//   // Cast the hours value to a number for each piece of tvData
//   tvData.forEach(function(d) {
//     d.hours = +d.hours;
//   });

//   // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
//   var xBandScale = d3.scaleBand()
//     .domain(tvData.map(d => d.name))
//     .range([0, chartWidth])
//     .padding(0.1);

//   // Create a linear scale for the vertical axis.
//   var yLinearScale = d3.scaleLinear()
//     .domain([0, d3.max(tvData, d => d.hours)])
//     .range([chartHeight, 0]);

//   // Create two new functions passing our scales in as arguments
//   // These will be used to create the chart's axes
//   var bottomAxis = d3.axisBottom(xBandScale);
//   var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

//   // Append two SVG group elements to the chartGroup area,
//   // and create the bottom and left axes inside of them
//   chartGroup.append("g")
//     .call(leftAxis);

//   chartGroup.append("g")
//     .attr("transform", `translate(0, ${chartHeight})`)
//     .call(bottomAxis);

//   // Create one SVG rectangle per piece of tvData
//   // Use the linear and band scales to position each rectangle within the chart
//   chartGroup.selectAll(".bar")
//     .data(tvData)
//     .enter()
//     .append("rect")
//     .attr("class", "bar")
//     .attr("x", d => xBandScale(d.name))
//     .attr("y", d => yLinearScale(d.hours))
//     .attr("width", xBandScale.bandwidth())
//     .attr("height", d => chartHeight - yLinearScale(d.hours));

// }).catch(function(error) {
//   console.log(error);
// });




