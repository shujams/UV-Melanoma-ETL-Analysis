var map = L.map('map').setView([37.8, -96], 4);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic21zNzg2IiwiYSI6ImNrN3drcG15ZzAzZGEzbHBpaG5ndjdtZW8ifQ.1qrR_a2RoKB7_9NDyadMRQ', {
maxZoom: 18,
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> ' +
  '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
  'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
id: 'mapbox/light-v9',
tileSize: 512,
zoomOffset: -1
}).addTo(map);


// control that shows state info on hover
var info = L.control();

info.onAdd = function (map) {
this._div = L.DomUtil.create('div', 'info');
this.update();
return this._div;
};

info.update = function (props) {
this._div.innerHTML = '<h4>US UV Radiation Density</h4>' +  (props ?
  '<b>' + props.name + '</b><br />' + props.UV + ' UV_ Wh/m<sup>2</sup> '
  : 'Hover over a state');
};

info.addTo(map);


// get color depending on UV value value
function getColor(d) {
return d > 4714 ? '#ffffd9' :
    d > 4515  ? '#edf8b1' :
    d > 4278  ? '#c7e9b4' :
    d > 4100  ? '#81cebc' :
    d > 3952   ? '#76cad4' :
    d > 3842   ? '#76cad4' :
    d > 3799   ? '#7bb3e4' :
    d > 0     ? '#89aee2':
                '#d0ccc5';
}

function style(feature) {
return {
  weight: 2,
  opacity: 1,
  color: 'white',
  dashArray: '3',
  fillOpacity: 0.7,
  fillColor: getColor(feature.properties.UV)
};
}

function highlightFeature(e) {
var layer = e.target;

layer.setStyle({
  weight: 5,
  color: '#666',
  dashArray: '',
  fillOpacity: 0.7
});

if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
  layer.bringToFront();
}

info.update(layer.feature.properties);
}

var geojson;

function resetHighlight(e) {
geojson.resetStyle(e.target);
info.update();
}

function zoomToFeature(e) {
map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
layer.on({
  mouseover: highlightFeature,
  mouseout: resetHighlight,
  click: zoomToFeature
});
}
// load geojson data (UV values plus state demarkations)

geojson = L.geoJson(statesData, {
style: style,
onEachFeature: onEachFeature
}).addTo(map);

map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');

// create legend with UV gradations

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

var div = L.DomUtil.create('div', 'info legend'),
  grades = [0, 3799, 3842, 3952, 4100, 4278, 4515, 4714],
  labels = [],
  from, to;

for (var i = 0; i < grades.length; i++) {
  from = grades[i];
  to = grades[i + 1];

  labels.push(
    '<i style="background:' + getColor(from + 1) + '"></i> ' +
    from + (to ? '&ndash;' + to : '+'));
}

div.innerHTML = labels.join('<br>');
return div;
};

legend.addTo(map);