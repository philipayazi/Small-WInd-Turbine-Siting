url = "/allcities"
console.log(city)
// d3.json(url).then(function (data) {
d3.json(url, function (error, data) {

  console.log('json', data);

  data.forEach(function (d) {

    if (d.city === city ) {
      console.log('selected mph >>>', d.mph.slice(0, 60));

      /* Label data */
      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      var years = ['2013', '2014', '2015', '2016', '2017'];

      /* Create the chart */
      var chart = circularHeatChart()
        .segmentHeight(25)
        // .segmentHeight(5)        
        .innerRadius(20)
        .numSegments(12)
        // .domain([50, 200])
        .range(['white', 'black'])
        .segmentLabels(months)
        .radialLabels(years);

      d3.select('#chart')
        .selectAll('svg')
        .data([d.mph.slice(0, 60)])
        .enter()
        .append('svg')
        .call(chart);

    }
  });
});






