
$(document).ready(function() {
	$('#sign-up').click(function() {
		$('.section').addClass('hide');
		$('#signup-page').removeClass('hide');
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
	});

	$('#write-whine').click(function() {
		$('.section').addClass('hide');
		$('#restaurant-whine').removeClass('hide');
	});

	$('#restaurant-whine form').submit(function(event) {
		event.preventDefault();
		$('.section').addClass('hide');
		$('#latest-feeds').removeClass('hide');
	});	

	$('#back-button').click(function(event) {
		event.preventDefault();
		$('.section').addClass('hide');
		$('#restaurant-info').removeClass('hide');
	});

	$('#signup-page form').submit(function(event) {
		event.preventDefault();
		const userData = {
			firstName: $('#signup-page [name="first-name"]').val(),
			lastName: $('#signup-page [name="last-name"]').val(),
			phone: $('#signup-page [name="phone-number"]').val(),
			email: $('#signup-page [name="email-address"]').val(),
			password: $('#signup-page [name="password"]').val()
		};
		$.ajax('/users', {
			contentType: 'application/json',
			data: JSON.stringify(userData),
			type: 'POST'}) 
		.then(function(res) {
			$('.section').addClass('hide');
			$('#login-page').removeClass('hide');
		});
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

