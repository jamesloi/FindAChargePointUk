var mymap = L.map('mapid').setView([51.507448,-0.127776], 16);

var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ffff00",
    color: "#ff0000",
    weight: 3,
    opacity: 1,
    fillOpacity: 0.8
};


L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
}).addTo(mymap);


/*L.geoJson(geoJsonFull, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
    },
    onEachFeature: onEachFeature
}).addTo(mymap);*/

Android.getLastLocation();

function getLocation(longitude, latitude)
{
    mymap.panTo(new L.LatLng(latitude, longitude));
    L.marker([latitude, longitude]).addTo(mymap).bindPopup("<b>You are here!</b>").openPopup();
    mymap.setView([latitude,longitude], 16);
}

function onEachFeature(feature, layer) {
    var popupContent = "<h2>Car Charge Point</h2>";
    if (feature.properties) {
        for (var key in feature.properties) {
          if (feature.properties.hasOwnProperty(key) && key !== "@id") {
            popupContent += "<p><strong>" + key + ":</strong> " + feature.properties[key] + "</p>";
          }
        }
    }
    layer.bindPopup(popupContent);
}