
$(document).ready(function() {
	
	$('#sign-up').click(function() {
		$('.section').addClass('hide');
		$('#signup-page').removeClass('hide');
	}); //$('#sign-up').click(function()

	$('#restaurants li').click(function() {
		$('.section').addClass('hide');
		$('#restaurant-info').removeClass('hide');
	}); //$('#restaurants li').click(function()

	$('#write-whine').click(function() {
		$('.section').addClass('hide');
		$('#restaurant-whine').removeClass('hide');
	}); //$('#write-whine').click(function()

	$('#restaurant-whine form').submit(function(event) {
		event.preventDefault();
		const whineData = {
			food: $('#whine-form [name="food-rating"]').val(),
			service: $('#whine-form [name="food-rating"]').val(),
			cleanliness: $('#whine-form [name="cleanliness-rating"]').val(),
			price: $('#whine-form [name="price-rating"]').val(),
			review: $('#whine-form [name="whine-review"]').val(),
		}; //whineData
		$.ajax('/whines', {
			contentType: 'application/json',
			data: JSON.stringify(whineData),
			type: 'POST'}) 
		.then(function(res) {
			alert('Thank you for your whine.');
			$('.section').addClass('hide');
			$('#latest-feeds').removeClass('hide');
		}); //.then function	
	});	//$('#restaurant-whine form').submit(function(event)

	$('#back-button').click(function(event) {
		event.preventDefault();
		$('.section').addClass('hide');
		$('#restaurant-info').removeClass('hide');
	}); //$('#back-button').click(function(event)

	$('#signup-page form').submit(function(event) {
		event.preventDefault();
		const userData = {
			firstName: $('#signup-page [name="first-name"]').val(),
			lastName: $('#signup-page [name="last-name"]').val(),
			phone: $('#signup-page [name="phone-number"]').val(),
			email: $('#signup-page [name="email"]').val(),
			password: $('#signup-page [name="password"]').val()
		}; //const userData
		$.ajax('/users', {
			contentType: 'application/json',
			data: JSON.stringify(userData),
			type: 'POST'}) 
		.then(function(res) {
			alert('Thank you for signing up.');
			$('.section').addClass('hide');
			$('#login-page').removeClass('hide');
		}); //.then function
	}); //$('#signup-page form').submit(function(event)

	$('#login-page form').submit(function(event) {
		event.preventDefault();
		const loginData = {
			email: $('#login-page [name="email"]').val(),
			password: $('#login-page [name="password"]').val()
		}; //const loginData
		$.ajax('/login', {
			contentType: 'application/json',
			data: JSON.stringify(loginData),
			type: 'POST'}) 
		.then(function(res) {
			$('.section').addClass('hide');
			$('#search-result').removeClass('hide'); 
			displayMap();
		});	//.then function
	}); //$('#login-page form').submit(function(event)


}); //$(document).ready(function()



function displayMap() {
	navigator.geolocation.getCurrentPosition(function(position) {
    	var currentLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
    	var map = new google.maps.Map(document.getElementById('map'), {
	      center: currentLocation,
	      zoom: 13
	    }); //map
	}); //getCurrentPosition function
} //function displayMap()


