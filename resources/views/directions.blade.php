<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Google Maps Directions API Exercise</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <div id="floating panel">
        <div>
            <span>Origin</span>
            <input type="text" id="origin">
        </div>
        <div>
            <span>Destination:</span>
            <input type="text" id="destination">
        </div>
        <div>
            <input type="button" value="View Route" id="view-route">
        </div>
    </div>

    <div id="map"></div>
    <script>

        function initMap() {
            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer;

            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 7,
                center: {lat: 10.3157, lng: 123.8854}, // Cebu City, Philippines
            });

            directionsDisplay.setMap(map);
            var onClickRouteHandler = function () {
                displayRoute(directionsService, directionsDisplay);
            };
            document.getElementById('view-route').addEventListener('click', onClickRouteHandler);
        }

        function displayRoute(directionsService, directionsDisplay) {
            directionsService.route({
                origin: document.getElementById('origin').value,
                destination: document.getElementById('destination').value,
                travelMode: 'DRIVING'
            }, function(response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
        }
    
    </script>
    
    <script src="https://maps.googleapis.com/maps/api/js?libraries=places,geometry,drawing&key=AIzaSyBMmXqBwNOOYMB4dC2rcV_qh8BvHrnsNxA&callback=initMap"
    async defer></script>
</body>
</html>