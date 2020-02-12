url = "http://localhost:5000"

var rangeslider = document.getElementById("sliderRange");
var output = document.getElementById("demo");
output.innerHTML = rangeslider.value;

rangeslider.oninput = function() {
  output.innerHTML = this.value;
}


d3.json(url).then( function(data){
    console.log(data);
});


