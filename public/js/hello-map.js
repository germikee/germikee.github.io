var map;

function initialize() {

	// Hello Map
	var options = {
		zoom: 15,
		center: new google.maps.LatLng(10.3157, 123.8854), // Cebu City
		mapTypeId: google.maps.MapTypeId.ROADMAP
		// styles: mapStyle
	};

	map = new google.maps.Map(document.getElementById('map'), options);
	// end Hello Map

	// Styling Map
	map.setOptions({
		styles: mapStyle
	});
	// end Styling Map

	// Traffic Layer
	var trafficLayer = new google.maps.TrafficLayer();
	trafficLayer.setMap(map);

	// Geocoding
	var geocoder = new google.maps.Geocoder();

	var infoWindow = new google.maps.InfoWindow();

	var geocode_marker = new google.maps.Marker({
		map: map,
		position: new google.maps.LatLng(0,0)
	});

	google.maps.event.addListener(map, 'click', function(event) {
		geocoder.geocode( { 'latLng' : event.latLng }, function(results, status){
			if (status == google.maps.GeocoderStatus.OK) {
				map.setCenter(results[0].geometry.location);
				geocode_marker.setPosition(event.latLng);
				infoWindow.setContent(results[0].formatted_address);
				infoWindow.open(map, geocode_marker);
			}
			else
				alert("Error: " + status);
		})
	});
	// end Geocoding

	// Directions
	document.getElementById('view-route').addEventListener('click', function() {
		var directionsService = new google.maps.DirectionsService();
		var directionsDisplay;

		var requestRoute = {
			origin: document.getElementById('origin').value,
			destination: document.getElementById('destination').value,
			travelMode: google.maps.TravelMode.DRIVING
		};

		directionsService.route(requestRoute, function(result, status) {
			if (status === google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(result);
			}
		});

		directionsDisplay = new google.maps.DirectionsRenderer();
		directionsDisplay.setMap(map);
		directionsDisplay.setPanel(document.getElementById('directions-panel'));

		var rendererOptions = {
			draggable: true
		};

		var directionsDisplay = directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);

		directionsDisplay.setMap(map);
		directionsDisplay.setPanel(document.getElementById('directions-panel'));

		// Distance Matrix
		var service = new google.maps.DistanceMatrixService();

		service.getDistanceMatrix({
			origins: [document.getElementById('origin').value],
			destinations: [document.getElementById('destination').value],
			travelMode: google.maps.TravelMode.DRIVING,
			unitSystem: google.maps.UnitSystem.METRIC,
			avoidHighways: false,
			avoidTolls: false
		}, function(response, status) {
			if (status != google.maps.DistanceMatrixStatus.OK) {
				alert('Error :' + status);
			} else {
				var origins = response.originAddresses;
				var destinations = response.destinationAddresses;

				for (var i=0; i < origins.length; i++) {
					var results = response.rows[i].elements;
					for (var x = 0; x < results.length; x++) {
						var element = results[x];
						var distance = element.distance.text;
						var duration = element.duration.text;
						var from = origins[i];
						var to = destinations[x];
						distanceText.innerHTML = '<b>' + from + '</b> to <b>' + to + '</b> : <b>' + distance + '</b> in <b>' + duration + '</b><br/>';
						console.log(from + ' to ' + to + ' : ' + distance + ' in ' + duration);
					}
				}
			}
		});
	});

	// Places API
	var origin_autocomplete = new google.maps.places.Autocomplete(document.getElementById('origin'));
	var destination_autocomplete = new google.maps.places.Autocomplete(document.getElementById('destination'));
	origin_autocomplete.bindTo('bounds', map);
	destination_autocomplete.bindTo('bounds', map);

	// var places_marker = new google.maps.Marker({
	// 	map: map,
	// 	position: new google.maps.LatLng(0,0)
	// });

	// google.maps.event.addListener(origin_autocomplete, 'places_changed', function() {
	// 	places_marker.setVisible(false);
	// 	var place = origin_autocomplete.getPlace();

	// 	if (!place.geometry) {
	// 		alert('No geometry contained from returned place.');
	// 		return;
	// 	}

	// 	if (place.geometry.viewport) {
	// 		map.fitBounds(place.geometry.viewport);
	// 	} else {
	// 		places_marker.setPosition(place.geometry.location);
	// 		places_marker.setVisible(true);
	// 	}
	// });

}