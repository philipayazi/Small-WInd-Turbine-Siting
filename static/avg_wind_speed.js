
url = "/allcities"

// ================================ table 
// Define SVG area dimensions
var svgWidth = 1400; //1440; 960;
var svgHeight = 500; //660;


// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 100, //30,
  left: 80
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;


//// ================================ slider
// var rangeslider = document.getElementById("sliderRange");
// var output = document.getElementById("mySlider");
// output.innerHTML = rangeslider.value;

d3.json(url).then(function (data) {
  console.log('orig json >>> ', data);
});

  d3.json(url).then(function (data) {
    console.log('json', data);

    d3.select("svg").remove()

    ////Select body, append SVG area to it, and set the dimensions
    var svg = d3.select("#chart1")
      .append("svg")
      .attr("height", svgHeight)
      .attr("width", svgWidth);

    // // 
    //   svg.append("rect")
    //   .attr("width", "100%")
    //   .attr("height", "100%")
    //   .attr("fill", "white");
    // Append border around bar chart
      svg.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("height", chartHeight*1.35)
      .attr("width", chartWidth*1.07)
      .style("stroke", "black")
      .style("fill", "white")
      .style("stroke-width", 2);
      // .attr("style", "outline: thin solid black;");

    // Append a group to the SVG area and shift ('translate') it to the right and to the bottom
    var chartGroup = svg.append("g")
      .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);
      

    // Append axis labes
      svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - chartMargin.left +100)
      .attr("x",0 - (chartHeight / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Average Wind Speed (mph)");    

      svg.append("text")             
      .attr("transform",
            "translate(" + ((chartWidth + 90)/2) +  " ," + 
                           (chartHeight + chartMargin.top + 90) + ")")
      .style("text-anchor", "middle")
      .text("City");

    // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
    var xBandScale = d3.scaleBand()
      .domain(data.map(d => d.city))
      .range([0, chartWidth])
      .padding(0.1);

    // Create a linear scale for the vertical axis.
    var yLinearScale = d3.scaleLinear()
      // .domain([0, d3.max(tvData, d => d.hours)])
      .domain([0, 10])
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
      .style("text-anchor", "start")
      .style("color", "black");

    data.sort(function(a, b) {
        return a.frequency - b.frequency;
      }); 

    // Create one SVG rectangle per piece of tvData
    // Use the linear and band scales to position each rectangle within the chart
    chartGroup.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => xBandScale(d.city))
      .attr("y", d => yLinearScale(d.mph_avg))
      .attr("width", xBandScale.bandwidth())
      .attr("height", d => chartHeight - yLinearScale(d.mph_avg))
      .attr("fill", "orange")
      .on("mouseover", function(){
        d3.select(this)
          .attr("fill", "green")
      })
      .on("mouseout", function(){
        d3.select(this)
          .attr("fill", "orange")
      })
      .on('click', function(d){
        location.assign("/heatmap/"+d.city)

      // .sort(function(d){
      //   return d3.descending(d.value)
      // })
      // .on('click', function(d){

      // })

      // console.log(this)
      // window.open(`/heatmap/${this.options.city}`, '_blank')
      });

      
  });


// }

