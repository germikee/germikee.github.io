var establishment_markers = [];
var geocoders;
var infoWindow;
var infoWindow_geocodes;
var map;
var markers = [];
var marker_geocodes;
var placeMarkers = [];
var polygon = null;

var selectedTextBox;
var origin_place_id;
var destination_place_id;

document.querySelector('body').addEventListener('click', function(e) {
    if (e.target.id == 'origin' || e.target.id == 'destination') {
        selectedTextBox = e.target;
    }
});

google.charts.load('current', {'packages':['corechart']});

function drawChart(marker) {
    console.log('marker.other');
    console.log(marker.other);
    if (marker.other){
        var data = google.visualization.arrayToDataTable([
            ['Month', 'Sales'],
            ['Jan', parseInt(marker.other[0])],
            ['Feb',parseInt(marker.other[1])],
            ['Mar',   parseInt(marker.other[2])],
            ['Apr',   parseInt(marker.other[3])],
            ['May',     parseInt(marker.other[4])],
            ['Jun',    parseInt(marker.other[5])],
            ['Jul',    parseInt(marker.other[6])],
            ['Aug',  parseInt(marker.other[7])],
            ['Sep',parseInt(marker.other[8])],
            ['Oct', parseInt(marker.other[9])]
        ]);

        var options = {
            title: 'Number of patrons per month in 2016',
            hAxis: {title: 'Month',  titleTextStyle: {color: '#333'}},
            vAxis: {minValue: 0}
        };

        var chart = new google.visualization.AreaChart(document.getElementById('chart'));
        chart.draw(data, options);
    }
}

$.getJSON('https://sheets.googleapis.com/v4/spreadsheets/1bOJBLhtesv4xWQM_rrtL7piI0Ce2srfQpRc0ONUJN1U/values/Sheet3!A:S?key=AIzaSyBgR1ShesDlym9HFRQNT39F_rmqsl88EkA',
    function(response) {
        console.log('response from get sheets');
        console.log(response);
        var chartData = [];
        var largeInfoWindow = new google.maps.InfoWindow();

        for ( var x=0; x < response.values.length; x++ ) {
            var title = response.values[x][0];
            var position = { lat: parseFloat(response.values[x][1]), lng: parseFloat(response.values[x][2]) };
            var place_id = response.values[x][3];
            var type = response.values[x][4];

            var icon = {
                url: response.values[x][5],
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            chartData = [
                response.values[x][6],
                response.values[x][7],
                response.values[x][8],
                response.values[x][9],
                response.values[x][10],
                response.values[x][11],
                response.values[x][12],
                response.values[x][13],
                response.values[x][14],
                response.values[x][15],
            ];

            var marker = new google.maps.Marker({
                position: position,
                title: title,
                id: place_id,
                animation: google.maps.Animation.DROP,
                type: type,
                icon: icon,
                other: chartData
            });


            markers.push(marker);
            marker.addListener('click', function() {
                console.log('marker on click');
                console.log(this);
                getPlacesDetails(this, largeInfoWindow);
            });
        }
    });

function initMap() {
    var rendererOptions = {
        draggable: true
    };
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
    var largeInfoWindow = new google.maps.InfoWindow();
    var center = {lat: 10.3157, lng: 123.8854};

    // map options
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: center, // Cebu City, Philippines
    });

    // Search Autocomplete
    var origin_autocomplete = new google.maps.places.Autocomplete(document.getElementById('origin'));
    var destination_autocomplete = new google.maps.places.Autocomplete(document.getElementById('destination'));
    origin_autocomplete.bindTo('bounds', map);
    destination_autocomplete.bindTo('bounds', map);

    // for (var i = 0; i < locations.length; i++) {
    //     var position = locations[i].location;
    //     var title = locations[i].title;
    //     var place_id = locations[i].place_id;
    //     var type = locations[i].type;

    //     var marker = new google.maps.Marker({
    //         position: position,
    //         title: title,
    //         animation: google.maps.Animation.DROP,
    //         place_id: place_id,
    //         type: type,
    //         id: place_id
    //     });

    //     markers.push(marker);
    //     marker.addListener('click', function() {
    //         getPlacesDetails(this, largeInfoWindow);
    //     });
    // }

    // Directions API
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directions-panel'));

    var onClickRouteHandler = function () {
        displayRoute(directionsService, directionsDisplay);
    };

    document.getElementById('view-route').addEventListener('click', onClickRouteHandler);

    document.getElementById('toggle-drawing').addEventListener('click', function() {
        toggleDrawing(drawingManager);
    });

    document.getElementById('remove-marker').addEventListener('click', removeMarker)

    // DrawingManager
    var drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.CIRCLE,
        drawingControl: true,
        drawingModes: [
            google.maps.drawing.OverlayType.CIRCLE
        ]
    });

    var mapCircle = new google.maps.Circle({
        center : {lat: 10.3157, lng: 123.8854},
        radius : 0,
        fillOpacity : 0,
        strokeOpacity : 0,
        map : map
    });

    /*drawingManager.addListener('overlaycomplete', function(event) {
        if (polygon) {
            polygon.setMap(null);
        }

        drawingManager.setDrawingMode(null);
        polygon = event.overlay;
        polygon.setEditable(true);
        searchWithinPolygon(polygon);

        polygon.getPath().addListener('set_at', searchWithinPolygon);
        polygon.getPath().addListener('insert_at', searchWithinPolygon);
    });*/

    google.maps.event.addListener(drawingManager,'circlecomplete', function(mapCircle){
        if(mapCircle) {
            mapCircle.setMap(null);
        }

        drawingManager.setDrawingMode(null);
        var radius = mapCircle.getRadius();
        var redondo=mapCircle;
        searchWithinPolygon(mapCircle);
        //observe radius_changed
        google.maps.event.addListener(redondo,'radius_changed',function(){
            alert(this.getRadius());
        });

    });
    // SearchBox
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });

    searchBox.addListener('places_changed', function() {
        var placesEstablishment = [];
        var discoveryUrl = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

        var places = searchBox.getPlaces();
        if (places.length == 0) {
            return;
        }

        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];

        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }

            placesEstablishment.push( [place.name, place.geometry.location.lat(), place.geometry.location.lng(), place.place_id , place.types[0], place.icon] );

            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            var marker = new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location,
                id: place.place_id
            });

            var placeInfoWindow = new google.maps.InfoWindow();

            marker.addListener('click', function() {
                if (placeInfoWindow.marker == this) {
                    console.log("This infowindow is already on this marker!");
                } else {
                    getPlacesDetails(this, placeInfoWindow);
                }
            });

            placeMarkers.push(marker);

            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });

        gapi.client.load(discoveryUrl).then(addData(placesEstablishment));
        map.fitBounds(bounds);
    });

    var geocoder = new google.maps.Geocoder();
    var infoWindow_geocode = new google.maps.InfoWindow();
    var marker_geocode = new google.maps.Marker({
        map: map,
        position: google.maps.LatLng(0,0)
    });

    infoWindow_geocodes = infoWindow_geocode;
    marker_geocodes = marker_geocode;
    geocoders = geocoder;

    //if origin not empty and destination not empty
    //call onClickRouteHandler
    //if origin not empty and destination empty
    //store in destination
    //if destination not empty and origin empty
    //store in origin

    google.maps.event.addListener(map, 'click', function(event) {
        geocoder.geocode( {'latLng': event.latLng}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                marker_geocode.setPosition(results[0].geometry.location);

                if ( selectedTextBox.id == 'origin' ) {
                    selectedTextBox.value = results[0].formatted_address;
                    origin_place_id = results[0].formatted_address;
                }

                if (selectedTextBox.id == 'destination') {
                    selectedTextBox.value = results[0].formatted_address;
                    destination_place_id = results[0].formatted_address;
                }

                infoWindow_geocode.setContent(results[0].formatted_address);
                infoWindow_geocode.open(map, marker_geocode);

            } else {
                alert ('Geocode was not successful for the following reason: ' + status);
            }
        });
    });
}

function clearMarkersOnMap(markers) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}

function removeMarker(){
    clearMarkersOnMap(markers);
    clearMarkersOnMap(placeMarkers);
    clearMarkersOnMap(geocoders);
    placeMarkers = [];
    infoWindow_geocodes.setContent(null);
    infoWindow_geocodes.close();
    marker_geocodes.setMap(null);
    document.getElementById('origin').value = null;
    document.getElementById('destination').value = null;
}

function populateInfoWindow(marker, infowindow) {
    if (infowindow.marker != marker) {
        innerHTML = '<div>' + marker.title + '</div>';
        infowindow.setContent(innerHTML);
        infowindow.open(map, marker);
        infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
        });
    }
}

function showListings() {
    var bounds = new google.maps.LatLngBounds();
    for (var i=0; i < markers.length; i++) {
        markers[i].setMap(map);
        bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
}

function showEstablishmentByType(type) {
    var bounds = new google.maps.LatLngBounds();
    for (var i=0; i < markers.length; i++) {
        if (markers[i]);
    }
}

function hideMarkers(markers) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}

// display route from origin and destination specified
function displayRoute(directionsService, directionsDisplay) {
    directionsService.route({
        origin: origin_place_id,
        destination: destination_place_id,
        travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

function getPlacesDetails(marker, infowindow) {
    drawChart(marker);
    var service = new google.maps.places.PlacesService(map);

    service.getDetails({
        placeId: marker.id
    }, function(place, status, pagination) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            infowindow.marker = marker;
            var innerHTML = '<div>';

            if (place.name) {
                innerHTML += '<strong>' + place.name + '</strong>';
            }
            if (place.formatted_address) {
                innerHTML += '<br>' + place.formatted_address;
            }
            if (place.formatted_phone_number) {
                innerHTML += '<br>' + place.formatted_phone_number;
            }
            if (place.opening_hours) {
                innerHTML += '<br><br><strong>Hours:</strong><br>' +
                place.opening_hours.weekday_text[0] + '<br>' +
                place.opening_hours.weekday_text[1] + '<br>' +
                place.opening_hours.weekday_text[2] + '<br>' +
                place.opening_hours.weekday_text[3] + '<br>' +
                place.opening_hours.weekday_text[4] + '<br>' +
                place.opening_hours.weekday_text[5] + '<br>' +
                place.opening_hours.weekday_text[6];
            }
            innerHTML += '<input type="button" onclick="showChart()" value="View Chart" />';
            if (place.photos) {
                innerHTML += '<br><br><img src="' + place.photos[0].getUrl(
                {maxHeight: 100, maxWidth: 200}) + '">';
            }
            innerHTML += '</div>';
            infowindow.setContent(innerHTML);
            infowindow.open(map, marker);
                // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function() {
                infowindow.marker = null;
            });
        }

        console.log('hasNextPage');
        console.log(pagination.hasNextPage);
        if (pagination.hasNextPage) {
            // var moreButton = document.getElementById('more');
            // moreButton.disabled = false;

            // moreButton.addEventListener('click', function() {
            //     moreButton.disabled = true;
                // pagination.nextPage();
            // });
            console.log(pagination.nextPage());
        }

    });
}

function showChart() {
  $('#chartModal').modal();
}

function searchWithinPolygon(mapCircle) {
    var school=0;
    var church=0;
    var store=0;
    var hospital=0;
    var restaurant=0;

    for (var i=0; i < markers.length; i++) {
        if( mapCircle.getBounds().contains(markers[i].getPosition()) ){
            markers[i].setMap(map);
            if(markers[i].type == 'school') {
                ++school;
            }
            if(markers[i].type == 'store') {
                ++store;
            }
            if(markers[i].type == 'hospital') {
                ++hospital;
            }
            if(markers[i].type == 'restaurant') {
                ++restaurant;
            }
            if(markers[i].type == 'church') {
                ++church;
            }
        } else {
            markers[i].setMap(null);
        }
    }
    showEstablishments.innerHTML = 'School: ' + school +
        ' Store: ' + store +
        ' Hospital: ' + hospital +
        ' Restaurant: ' + restaurant +
        ' Church: ' + church;
}

function toggleDrawing(drawingManager) {
    if (drawingManager.map) {
        drawingManager.setMap(null);
        if (polygon !== null) {
            polygon.setMap(null);
        }
    } else {
        drawingManager.setMap(map);
    }
}

function clearSearch() {
    if(placeMarkers.length) {
        for (var i = 0; i < placeMarkers.length; i++) {
            placeMarkers[i].setMap(null);
        }
        placeMarkers = [];
        document.getElementById('pac-input').value = '';
    }
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        id: place.place_id
    });

    establishment_markers.push(marker);

    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(place.name);
        infoWindow.open(map, this);
    });
}

function addData(places) {
    console.log('addData');
    console.log(places);
    gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: '1bOJBLhtesv4xWQM_rrtL7piI0Ce2srfQpRc0ONUJN1U',
        range: 'Sheet3!A1:F1',
        majorDimension: "ROWS",
        values: places,
        valueInputOption: 'USER_ENTERED'
    }).then(function(response) {
        console.log(response);
    });
}