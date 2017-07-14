
$(document).ready(function() {
	$('#sign-up').click(function() {
		$('.section').addClass('hide');
		$('#signup-page').removeClass('hide');
	});

	$('#signup-page form').submit(function(event) {
		event.preventDefault();
		$('.section').addClass('hide');
		$('#login-page').removeClass('hide');
	});

	$('#login-page form').submit(function(event) {
		event.preventDefault();
		$('.section').addClass('hide');
		$('#search-result').removeClass('hide');
		displayMap();
	});

	$('#restaurants li').click(function() {
		$('.section').addClass('hide');
		$('#restaurant-info').removeClass('hide');
		$('#restaurant-info form').addClass('hide');
	});

	$('#write-whine').click(function() {
		$('#whine-reviews').addClass('hide');
		$('#write-whine').addClass('hide');
		$('#whine-form').removeClass('hide');
		$('#back-button').removeClass('hide');
	});

	$('#restaurant-info form').submit(function(event) {
		event.preventDefault();
		$('.section').addClass('hide');
		$('#latest-feeds').removeClass('hide');
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

