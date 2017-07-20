
$(document).ready(function() {
	$('#sign-up').click(function() {
		$('.section').addClass('hide');
		$('#signup-page').removeClass('hide');
	});
/*
	$('#signup-page form').submit(function(event) {
		event.preventDefault();
		$('.section').addClass('hide');
		$('#login-page').removeClass('hide');
	});
*/
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
			firstName: $('[name="first-name"]').val(),
			lastName: $('[name="last-name"]').val(),
			phone: $('[name="phone-number"]').val(),
			email: $('[name="email-address"]').val(),
			password: $('[name="password"]').val()
		};
		$.ajax('/users', {
			contentType: 'application/json charset=utf-8',
			data: JSON.stringify(userData),
			method: 'POST'}) 
		.then(function(res) {
			console.log(res);
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

