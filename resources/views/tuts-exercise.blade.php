<!DOCTYPE html>
<html>
<head>
	<title>Hello Map</title>
	<style type="text/css">
		/*Hello Map style*/
		html, body, #map {
			margin: 0;
			padding: 0;
			height: 100%;
		}
		/*end Hello Map*/
		.floating-panel {
	        position: absolute;
	        top: 10px;
	        left: 38%;
	        z-index: 5;
	        background-color: #fff;
	        padding: 5px;
	        border: 1px solid #999;
	        text-align: center;
	        font-family: 'Roboto';
	        font-size: 15px;
	        line-height: 30px;
	        padding-left: 10px;
	    }
	</style>

	<script src="https://maps.googleapis.com/maps/api/js?v=3&libraries=places&key=AIzaSyBMmXqBwNOOYMB4dC2rcV_qh8BvHrnsNxA&callback=initialize"
    async defer></script>
    <script src="js/map-style.js"></script>
    <script src="js/hello-map.js"></script>
</head>
<body>
	<div id="map"></div>
	<div class="floating-panel">
		<input id="origin" type="text" placeholder="Origin">
		<input id="destination" type="text" placeholder="Destination">
		<input id="view-route" type="button" value="View Route">
		<div id="distanceText"></div>
	</div>
	<div id="directions-panel"></div>
</body>
</html>