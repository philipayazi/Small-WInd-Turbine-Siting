
url = "http://localhost:5000"

var rangeslider = document.getElementById("sliderRange");
var output = document.getElementById("mySlider");
output.innerHTML = rangeslider.value;


rangeslider.oninput = function () {
  output.innerHTML = this.value;
  console.log('slider value', output.innerHTML);

  d3.json(url).then(function (data) {
    console.log('json', data[11]);




  });


}





