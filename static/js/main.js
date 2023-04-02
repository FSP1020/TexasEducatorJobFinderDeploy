var isd_query;
var keyword_query;
var isd_data;

// Get a reference to the job table element
const jobTable = document.getElementById("job_table");

fetch('https://fsp1020.github.io/TexasEducatorJobFinderDeploy/static/data/TexasEmploymentSites_Filled.json')
  .then(res => res.json())
  .then(json => {
    //json vaiable contains object with data
    isd_data = json;

//     console.log(isd_data)

// Loop through the JSON data and add markers to the marker cluster group
var X_coords = isd_data["X"];
var Y_coords = isd_data["Y"];
var districtNames = isd_data["District_1"];
var employment_text = isd_data["Employment_Text"];

// Initialize the Leaflet map
var map = L.map("map").setView([31.9686, -99.9018], 6);
// Add a tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
  id: "mapbox.streets",
}).addTo(map);

// Initialize the marker cluster group
var markers = L.markerClusterGroup();

// Clear rows of table
jobTable.innerHTML = "";
var first_row = document.createElement("tr");
var districtCol = document.createElement("td");
districtCol.textContent = "District Name";
var urlCol = document.createElement("td");
urlCol.textContent = "Employment Link";

first_row.appendChild(districtCol);
first_row.appendChild(urlCol);

jobTable.appendChild(first_row);

// Create a class attribute:
const att = document.createAttribute("class");

// Set the value of the class attribute:
att.value = "header-row";

// Add the class attribute to the first h1:
const tr = document.getElementsByTagName("tr")[0];
tr.setAttributeNode(att);

for (var key in X_coords) {
  var marker = L.marker([Y_coords[key], X_coords[key]]);
  marker.bindPopup(
    "<a href='" +
      isd_data["Employment_Url"][key] +
      "' target='_blank'>" +
      districtNames[key] +
      "</a>"
  );
  markers.addLayer(marker);

  // create table row
  var row = document.createElement("tr");
  var districtCol = document.createElement("td");
  districtCol.textContent = districtNames[key];
  var urlCol = document.createElement("td");
  var link = document.createElement("a");
  link.textContent = isd_data["Employment_Url"][key];
  link.href = isd_data["Employment_Url"][key];
  urlCol.appendChild(link);

  row.appendChild(districtCol);
  row.appendChild(urlCol);

  jobTable.appendChild(row);
}

// Add the marker cluster group to the map
map.addLayer(markers);

var input1 = document.getElementById("input1");
input1.addEventListener("keyup", function (event) {
  isd_query = event.target.value.toLowerCase();
  runCallback1(); // call the callback function after isd_query has been updated
});

function runCallback1() {
    // console.log(isd_query); // use isd_query variable in the callback function

    // Clear the marker cluster group from the map
    markers.clearLayers();

    // Clear rows of table
    jobTable.innerHTML = "";
    var first_row = document.createElement("tr");
    var districtCol = document.createElement("td");
    districtCol.textContent = "District Name";
    var urlCol = document.createElement("td");
    urlCol.textContent = "Employment Link";

    first_row.appendChild(districtCol);
    first_row.appendChild(urlCol);

    jobTable.appendChild(first_row);

    // Create a class attribute:
    const att = document.createAttribute("class");

    // Set the value of the class attribute:
    att.value = "header-row";

    // Add the class attribute to the first h1:
    const tr = document.getElementsByTagName("tr")[0];
    tr.setAttributeNode(att);

    // Initialize the marker cluster group
    markers = L.markerClusterGroup();

    for (var key in X_coords) {
      if (districtNames[key] && districtNames[key].toLowerCase().includes(isd_query.toLowerCase())) {
        var marker = L.marker([Y_coords[key], X_coords[key]]);
        marker.bindPopup(
          "<a href='" +
            isd_data["Employment_Url"][key] +
            "' target='_blank'>" +
            districtNames[key] +
            "</a>"
        );
        markers.addLayer(marker);

        // create table row
        var row = document.createElement("tr");
        var districtCol = document.createElement("td");
        districtCol.textContent = districtNames[key];
        var urlCol = document.createElement("td");
        var link = document.createElement("a");
        link.textContent = isd_data["Employment_Url"][key];
        link.href = isd_data["Employment_Url"][key];
        urlCol.appendChild(link);


        row.appendChild(districtCol);
        row.appendChild(urlCol);

        jobTable.appendChild(row);
      }
    }

    // Add the marker cluster group to the map
    map.addLayer(markers);
  }

var input2 = document.getElementById("input2");
input2.addEventListener("keyup", function (event) {
  keyword_query = event.target.value.toLowerCase();
  runCallback2(); // call the callback function after isd_query has been updated
});

function runCallback2() {
  // console.log(keyword_query); // use keyword_query variable in the callback function

  // Clear the marker cluster group from the map
  markers.clearLayers();

  // Clear rows of table
  jobTable.innerHTML = "";
  var first_row = document.createElement("tr");
  var districtCol = document.createElement("td");
  districtCol.textContent = "District Name";
  var urlCol = document.createElement("td");
  urlCol.textContent = "Employment Link";

  first_row.appendChild(districtCol);
  first_row.appendChild(urlCol);

  jobTable.appendChild(first_row);

  // Create a class attribute:
  const att = document.createAttribute("class");

  // Set the value of the class attribute:
  att.value = "header-row";

  // Add the class attribute to the first h1:
  const tr = document.getElementsByTagName("tr")[0];
  tr.setAttributeNode(att);

  // Initialize the marker cluster group
  markers = L.markerClusterGroup();

  for (var key in X_coords) {
    if (employment_text[key] && employment_text[key].toLowerCase().includes(keyword_query.toLowerCase())) {
      var marker = L.marker([Y_coords[key], X_coords[key]]);
      marker.bindPopup(
        "<a href='" +
          isd_data["Employment_Url"][key] +
          "' target='_blank'>" +
          districtNames[key] +
          "</a>"
      );
      markers.addLayer(marker);

      // create table row
      var row = document.createElement("tr");
      var districtCol = document.createElement("td");
      districtCol.textContent = districtNames[key];
      var urlCol = document.createElement("td");
      var link = document.createElement("a");
      link.textContent = isd_data["Employment_Url"][key];
      link.href = isd_data["Employment_Url"][key];
      urlCol.appendChild(link);


      row.appendChild(districtCol);
      row.appendChild(urlCol);

      jobTable.appendChild(row);
    }
  }

  // Add the marker cluster group to the map
  map.addLayer(markers);
  }
  })
