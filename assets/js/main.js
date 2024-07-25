
// search field, clear input field
document.getElementById('searchInput').value = '';

function filterMarkers() {
    var input, filter, ul, li, i, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById('marker-list');
    li = ul.getElementsByTagName('li');

    console.log(filter);

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        txtValue = li[i].textContent || li[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

// Clear search input field with clear button
document.addEventListener('DOMContentLoaded', function() {
    var searchInput = document.getElementById('searchInput');
    var clearButton = document.getElementById('clearSearch');

    // Attach an event listener to the clear button
    clearButton.addEventListener('click', function() {
        // Clear the search input
        searchInput.value = '';

        // Optionally, call filterMarkers to reset the list
        filterMarkers();
    });

    // Assuming filterMarkers is defined elsewhere and handles filtering
    if (searchInput) {
        searchInput.addEventListener('keyup', filterMarkers);
    }
});

// ========= MAP =========
// Initialisiere die Karte
var map = L.map('map').setView([51.1657, 10.4515], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// // Beispielmarkierungen
// var markers = [
//     { lat: 51.5, lng: -0.09, popup: 'Aktivist 1 <br> <i>in London</i>', id: '1' },
//     { lat: 48.8566, lng: 2.3522, popup: 'Aktivist 2 <br> <i>in Paris</i>', id: '2' },
//     { lat: 52.5200, lng: 13.4050, popup: 'Aktivist 4 <br> <i>in Berlin</i>', id: '4' },
//     { lat: 48.1351, lng: 11.5820, popup: 'Aktivist 5 <br> <i>in München</i>', id: '5' },
//     { lat: 50.9375, lng: 6.9603, popup: 'Aktivist 6 <br> <i>in Köln</i>', id: '6' },
//     { lat: 53.5511, lng: 9.9937, popup: 'Aktivist 7 <br> <i>in Hamburg</i>', id: '7' },
//     { lat: 51.2277, lng: 6.7735, popup: 'Aktivist 8 <br> <i>in Düsseldorf</i>', id: '8' },
//     { lat: 50.1109, lng: 8.6821, popup: 'Aktivist 9 <br> <i>in Frankfurt</i>', id: '9' }
// ];

var markers = [
    // Heilbad Heiligenstadt
    { city: "Heilbad Heiligenstadt", lat: "51.3756186", lng: "10.138224", popup: 'Aktivist 1 <br> <i>in Heilbad Heiligenstadt</i>', id: '1' },
    // Münster
    { city: "Münster", lat: "51.9625101", lng: "7.6251879", popup: 'Aktivist 2 <br> <i>in Münster</i>', id: '2' },
]

// callable function to add a marker to the map and sidebar
function addMarker(marker) {
    var mark = L.marker([marker.lat, marker.lng]).addTo(map)
        .bindPopup(marker.popup);
    var listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    listItem.innerHTML = marker.popup;
    listItem.addEventListener('click', function() {
        map.setView([marker.lat, marker.lng], 13);
        mark.openPopup();
    });
    document.getElementById('marker-list').appendChild(listItem);
}

// if marker does not have lat and lng properties, get coordinates from city name
markers.forEach(function(marker) {
    if (!marker.lat && !marker.lng) {
        fetch(`https://nominatim.openstreetmap.org/search.php?q=${marker.city}&format=json`)
            .then(response => response.json())
            .then(data => {
                marker.lat = data[0].lat;
                marker.lng = data[0].lon;
                console.log(marker);
                addMarker(marker);
            });
    } else {
        addMarker(marker);
    }
});