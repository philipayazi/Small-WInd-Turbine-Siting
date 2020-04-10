
const dark = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
    });

const light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
    });

const baseMaps = {
    'Light': light,
    'Dark': dark
}

const myMap = L.map('map', {
    center: [39.8283, -98.5795 ],
    zoom: 5,
    layers: [light]
});

L.control.layers(baseMaps).addTo(myMap)

url = "/allcities"
d3.json(url).then( data => {
    const degree = data.map( city => {
        L.circleMarker(city.loc, {
                fillOpacity: 0.5,
                stroke: false,
                color: "red"
            })
            .setRadius(city.change_deg_avg)

            // .on('click', function(){
            //     console.log(this)
            //     window.open(`/heatmap/${this.options.city}`, '_blank')
            // })
            .addTo(myMap)
        });

    const velocity = data.map( city => {
                            L.circleMarker(city.loc, {
                                title: city.city,
                                fillOpacity: 0.75,
                                stroke: false,
                                color: "orange"
                            })
                            .setRadius(city.change_mph_avg*20)
                            .bindPopup(`<html>City: ${city.city}<br>Speed (MPH): ${city.change_mph_avg}<br>Direction (Degree): ${city.change_deg_avg}</html>`)
                            .addTo(myMap)
                        });

    

    L.control.layers(degree, velocity)

})