/*
function showUI() {
	$('#login-page').removeClass('hide');
	$('#signup-page').removeClass('hide');
	$('#sign-up').removeClass('hide');
}
*/

$(document).ready(function() {
	$('.sign-up').click(function() {
		$('#signup-page').removeClass('hide');
		$('#login-page').addClass('hide');
		$('#sign-up').addClass('hide');
	});

	$('#login-page').submit(function(event) {
		event.preventDefault();
		$('#login-page').addClass('hide');
		$('#sign-up').addClass('hide');
		$('#search-result').removeClass('hide');
		displayMap();
	});
});



function displayMap() {

	navigator.geolocation.getCurrentPosition(function(position) {
    	var currentLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
    	var map = new google.maps.Map(document.getElementById('map'), {
	      center: currentLocation,
	      zoom: 13
	    }); //map
	});
}