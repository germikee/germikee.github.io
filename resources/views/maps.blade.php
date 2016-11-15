<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Maps Exercises</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <div class="container">
        <div class="options-box">
            <h1>Find your new home</h1>
            <div>
                <input id="show-listings" value="Show Listing" type="button">
                <input id="hide-listings" value="Hide Listing" type="button">
            </div>
            <div>
                <input type="text" id="zoom-to-area-text" placeholder="Enter your favorite area">
                <input type="button" id="zoom-to-area" value="Zoom">
            </div>
            <div>
                <span class="text">Search for nearby places</span>
            </div>
            <div>
                <span class="text">Origin</span>
            </div>
            <div>
                <input type="text" id="id-origin" placeholder="Where are you?">
                <input type="button" id="set-origin" value="Set">
            </div>
            <div>
                <span class="text">Destination/s</span>
            </div>
            <div>
                <input type="text" id="places-search" placeholder="Ex: Pizza delivery in NYC">
                <input type="button" id="go-places" value="Go">
            </div>
            <div>
                <input type="button" value="View Route" id="display-route">
            </div>
        </div>
    </div>
    <div id="map"></div>
    <script>
      var map;
      var markers = [];
      var placeMarkers = [];
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 10.3157, lng: 123.8854},
          zoom: 8
        });
      
      var searchBox = new google.maps.places.SearchBox(document.getElementById('places-search'));
      var origin = new google.maps.places.SearchBox(document.getElementById('id-origin'));

      searchBox.setBounds(map.getBounds());

      var locations = [
        { title: 'Tuburan', location: {lat: 10.7076, lng: 123.8635} },
        { title: 'Bantayan Island', location: {lat: 11.1843, lng: 123.7462} },
        { title: 'Bohol', location: {lat: 9.8500, lng: 124.1435} }
      ];

      var largeInfowindow = new google.maps.InfoWindow();
      var bounds = new google.maps.LatLngBounds();

      for( var i=0; i<locations.length; i++ ) { 
        var position = locations[i].location;
        var title = locations[i].title;

        var marker = new google.maps.Marker({
            // map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i
        });

        markers.push(marker);
        //Extend the bouandaries
        bounds.extend(marker.position);
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
        });
      }

      function setOrigin() {
        var marker = new google.maps.Marker({
            position: {lat: 10.3157, lng: 123.8854},
            map: map,
            title: 'You are here!'
        });
      }

      function setDestination() {
        var marker = new google.maps.Marker({
            position: {lat: 10.31517, lng: 123.884342},
            map: map,
            title: 'Destination'
        });
      }

      document.getElementById('show-listings').addEventListener('click', showListings);
      /*document.getElementById('hide-listings').addEventListener('click', hideListings);*/
      document.getElementById('zoom-to-area').addEventListener('click', function() {
        zoomToArea();
      });

      searchBox.addListener('places_changed', function() {
        searchBoxPlaces(this); 
      });

      document.getElementById('set-origin').addEventListener('click', setOrigin);
      document.getElementById('go-places').addEventListener('click', setDestination);
      document.getElementById('display-route').addEventListener('click', displayRoute);

      function populateInfoWindow(marker, infowindow) {
        if(infowindow.marker != marker) {
            infowindow.setContent('');
            infowindow.marker = marker;
            infowindow.addListener('closeclick', function() {
                infowindow.marker = null;
            });
        }
      }

      function showListings() {
        var bounds = new google.maps.LatLngBounds();
        for (var i=0; i<markers.length; i++) {
            markers[i].setMap(map);
            bounds.extend(markers[i].position);
        }
        map.fitBounds(bounds);
      }

      function hideMarkers(markers) {
        for (var i=0; i<markers.length; i++) {
            markers[i].setMap(null);
        }
      }

      function zoomToArea() {
        var geocoder = new google.maps.Geocoder();
        var address = document.getElementById('zoom-to-area-text').value;

        if(address == '') {
            window.alert('You must enter an area or an address.');
        } else {
            geocoder.geocode(
                {
                    address: address,
                    componentRestrictions: {country: 'ph'}
                }, function(results, status) {
                    if(status == google.maps.GeocoderStatus.OK) {
                        map.setCenter(results[0].geometry.location);
                        map.setZoom(15);
                    } else {
                        window.alert('We could not find that location.');
                    }
                }
            );
        }
      }

      function searchBoxPlaces(searchBox) {
        hideMarkers(placeMarkers);
        var places = searchBox.getPlaces();
        createMarkersForPlaces(places);
        if(places.length == 0) {
            window.alert('We did not find any places matching that search!');
        }
      }

      function textSearchPlaces() {
        var bounds = map.getBounds();
        hideMarkers(placeMarkers);
        var placesService = new google.maps.places.PlacesService(map);
        placesService.textSearch({
            query: document.getElementById('places-search').value,
            bounds: bounds
        }, function(results, status) {
            if(status === google.maps.places.PlacesServiceStatus.OK) {
                createMarkersForPlaces(results); 
            }
        });
      }

      function createMarkersForPlaces(places) {
        var bounds = new google.maps.LatLngBounds();
                for(var i=0; i<places.length; i++) {
                    var place = places[i];
                    var icon = {
                        url: place.icon,
                        size: new google.maps.Size(35, 35),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(15, 34),
                        scaledSize: new google.maps.Size(25, 25)
                };
                // Create a marker for each place
                var marker = new google.maps.Marker({
                    map: map,
                    icon: icon,
                    title: place.name,
                    position: place.geometry.location,
                    id: place.place_id
                });

                // Create a single infowindow to be used with the place details information
                // so that only one is open at once.
                var placeInfoWindow = new google.maps.InfoWindow();
                // If a marker is clicked, do a place details search on it in the next function.
                marker.addListener('click', function() {
                    if(placeInfoWindow.marker == this) {
                        console.log("This infowindow is already on this marker!");
                    } else {
                        getPlacesDetails(this, placeInfoWindow);
                    }
                });

                placeMarkers.push(marker);
                
                if(place.geometry.viewport) {
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            }
            map.fitBounds(bounds);
      }

      function getPlacesDetails(marker, infowindow) {
        var service = new google.maps.places.PlacesService(map);
        service.getDetails({
            placeId: marker.id
        }, function(place, status) {
            if(status === google.maps.places.PlacesServiceStatus.OK) {
                // Set the marker property on this infowindow so it isn't created again.
                infowindow.marker = marker;
                var innerHTML = '<div>';
                if(place.name) {
                    innerHTML += '<strong>' + place.name + '</strong>';
                }
                if(place.formatted_address) {
                    innerHTML += '<br>' + place.formatted_address;
                }
                if(place.formatted_phone_number) {
                    innerHTML += '<br>' + place.formatted_phone_number;
                }
                if(place.opening_hours) {
                    innerHTML += '<br><br><strong>Hours:</strong><br>' +
                    place.opening_hours.weekday_text[0] + '<br>' +
                    place.opening_hours.weekday_text[1] + '<br>' +
                    place.opening_hours.weekday_text[2] + '<br>' +
                    place.opening_hours.weekday_text[3] + '<br>' +
                    place.opening_hours.weekday_text[4] + '<br>' +
                    place.opening_hours.weekday_text[5] + '<br>' +
                    place.opening_hours.weekday_text[6];
                }
                if(place.reviews) {
                    for(var i=0; i<place.reviews.length; i++) {
                        if(!(typeof place.reviews[i].text)) {
                            innerHTML += '<br><strong>Reviews:</strong>' + place.reviews[i].text;   
                        }
                    }
                }
                if(place.photos) {
                    innerHTML += '<br><br><img src="' + place.photos[0].getUrl(
                        {
                            maxHeight: 100,
                            maxWidth: 200
                        }) + '">';
                }
                innerHTML += '</div>';
                infowindow.setContent(innerHTML);
                infowindow.open(map, marker);
                // Make sure the marker property is cleared if the infowindow is closed.
                infowindow.addListener('closeclick', function() {
                    infowindow.marker = null;
                });
            }
        })
      }

      function displayDirectionss(origin) {
        var directionsService = new google.maps.directionsService;
        var destinationAddress = document.getElementById('places-search').value;

        directionsService.route({
            origin: origin,
            destination: destinationAddress
        }, function(response, status) {
            if(status == google.maps.DirectionsStatus.OK) {
                var directionsDisplay = new google.maps.DirectionsRenderer({
                    map: map,
                    directions: response,
                    draggable: true,
                    polylinOptions: {
                        strokeColor: 'red'
                    }
                });
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
      }

      function displayRoute() {
        var directionsService = new google.maps.DirectionsService;
        var destinationAddress = document.getElementById('places-search').value;

        directionsService.route({
            origin: document.getElementById('id-origin').value,
            destinationAddress: destinationAddress
        }, function(response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            var directionsDisplay = new google.maps.DirectionsRenderer({
              map: map,
              directions: response,
              draggable: true,
              polylineOptions: {
                strokeColor: 'green'
              }
            });
          } else {
            window.alert('Directions request failed due to ' + status);
          }            
        });
      }

      function displayDirections() {
        var directionsService = new google.maps.DirectionsService;
        // Get the destination address from the user entered value.
        var destinationAddress = {lat: 10.31517, lng: 123.884342};
        // Get mode again from the user entered value.
        var mode = document.getElementById('mode').value;
        directionsService.route({
          // The origin is the passed in marker's position.
          origin: document.getElementById('id-origin').value,
          // The destination is user entered address.
          destination: destinationAddress
        }, function(response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            var directionsDisplay = new google.maps.DirectionsRenderer({
              map: map,
              directions: response,
              draggable: true,
              polylineOptions: {
                strokeColor: 'green'
              }
            });
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
    }

    </script>

    <script src="https://maps.googleapis.com/maps/api/js?libraries=places,geometry,drawing&key=AIzaSyBMmXqBwNOOYMB4dC2rcV_qh8BvHrnsNxA&callback=initMap"
    async defer>
    </script>
</body>
</html>

<!-- Sample marker object -->
<!-- 
var sagada = {lat: 17.0981, lng: 120.9073};
var marker = new google.maps.Marker({
    position: sagada,
    map: map,
    title: 'Try the Sumaguing Cave!'
});

var infowindow = new google.maps.InfoWindow({
    content: 'Best unforgettable experience ever!'
});
marker.addListener('click', function() {
    infowindow.open(map, marker);
}); 
-->