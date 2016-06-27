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


var featuresLayer = L.geoJson(geoJsonFull, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
    },
    onEachFeature: onEachFeature
});

mymap.addLayer(featuresLayer);

var fuse = new Fuse(geoJsonFull.features, {
    keys: ['properties.Name', 'properties.Address1', 'properties.Address2', 'properties.Town', 'properties.County', 'properties.Postcode']
});

var searchControl = new L.Control.Search({
    layer: featuresLayer,
    propertyName: 'Name',
    filterData: function(text, records) {
        var jsons = fuse.search(text),
            ret = {}, key;

        for(var i in jsons) {
            key = jsons[i].properties.Name;
            ret[ key ]= records[key];
        }

        console.log(jsons,ret);
        return ret;
    }
});

mymap.addControl( searchControl );

Android.getLastLocation();

function getLocation(longitude, latitude)
{
    mymap.panTo(new L.LatLng(latitude, longitude));
    L.marker([latitude, longitude]).addTo(mymap).bindPopup("<b>You are here!</b>").openPopup();
    mymap.setView([latitude,longitude], 16);
}

function onEachFeature(feature, layer) {
    var popupContent = "<h2>EV Car Charge Point</h2>";
    if (feature.properties) {
        for (var key in feature.properties) {
          if (feature.properties.hasOwnProperty(key) && key == "NumberOfConnections") {
            popupContent += "<p><strong>Number Of Connections:</strong> " + feature.properties[key] + "</p>";
          }
          else
          {
                if (feature.properties.hasOwnProperty(key) && key == "Connections") {
                    for (var c in feature.properties.Connections)
                    {
                        popupContent += "<table style='width:100%;border: 1px solid Silver;border-collapse:collapse;'>";
                        popupContent += "<tr style='border: 1px solid Silver;'><th>Amps</th><th>Voltage</th><th>Power Kw</th><th>Quantity</th></tr><tr>";
                        for (var con in feature.properties.Connections[c])
                        {
                            popupContent += "<td>" + feature.properties.Connections[c][con] + "</td>";
                        }
                        popupContent += "</tr></table><br>";
                    }
                }
                else
                {
                  if (feature.properties.hasOwnProperty(key)) {
                    popupContent += "<p><strong>" + key + ":</strong> " + feature.properties[key] + "</p>";
                  }
                }
          }
        }
    }
    layer.bindPopup(popupContent);
}