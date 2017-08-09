
$(document).ready(function() {
	
	$('#sign-up').click(function() {
		$('.section').addClass('hide');
		$('#signup-page').removeClass('hide');
	}); //$('#sign-up').click(function()

	$('ul#results-list').on('click', 'li', function() {
		var restaurant = $(this).data('restaurant');
		console.log($(this).data('restaurant'));
		$('.section').addClass('hide');
		$('#restaurant-info').data('restaurant', restaurant).removeClass('hide');
		
		var price = '$';
		$('#restaurant-details .name').text(restaurant.name);
		$('#restaurant-details .address').text(restaurant.formatted_address);
		$('#restaurant-details .price').text('Price: ' + (price.repeat(restaurant.price_level)));
		 
		getRestaurantInfo(restaurant);

	}); //$('ul#results-list').on('click', 'li', function()

	$('#write-whine').click(function() {
		var restaurant = $('#restaurant-info').data('restaurant');
		$('#whine-reviews').addClass('hide');
		$('#write-whine').addClass('hide');
		$('#whine-form').removeClass('hide');
	}); //$('#write-whine').click(function()

	$('.back-to-search-results').click(function(event) {
		event.preventDefault();
		$('.section').addClass('hide');
		$('#search-result').removeClass('hide');
	}); //$('#back-button').click(function(event)

	$('#whine-form').submit(function(event) {
		event.preventDefault();
		var restaurant = $('#restaurant-info').data('restaurant');
		const whineData = {
			food: $('#whine-form [name="food-rating"]').val(),
			service: $('#whine-form [name="food-rating"]').val(),
			cleanliness: $('#whine-form [name="cleanliness-rating"]').val(),
			price: $('#whine-form [name="price-rating"]').val(),
			review: $('#whine-form [name="whine-review"]').val(),
			restaurant: restaurant.place_id
		}; //whineData
		$.ajax('/whines', {
			contentType: 'application/json',
			data: JSON.stringify(whineData),
			type: 'POST'}) 
		.then(function(res) {
			alert('Thank you for your whine.');
			$('.section').addClass('hide');
			$('#latest-feeds').removeClass('hide');

			getLatestWhines();
		}); //.then function	
	});	//$('#restaurant-whine form').submit(function(event)

	$('.back-to-restaurant-info').click(function(event) {
		event.preventDefault();
		console.log('its working');
		$('#whine-form').addClass('hide');
		$('#write-whine').removeClass('hide');
		$('#whine-reviews').removeClass('hide');
	}); //$('.back-to-restaurant-info').click(function(event)

	$('.back-to-info').click(function(event) {
		event.preventDefault();
		console.log('its working');
		$('.section').addClass('hide');
		$('#whine-form').addClass('hide');
		$('#restaurant-info').removeClass('hide');
		$('#write-whine').removeClass('hide');
		$('#whine-reviews').removeClass('hide');
	}); //$('.back-to-info').click(function(event)

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
			$('#logout').removeClass('hide');
			$('#search-result').removeClass('hide'); 
			displayMap();
		});	//.then function
	}); //$('#login-page form').submit(function(event)

	$('#logout').click(function(event) {
		event.preventDefault();
		$.ajax('/logout', {
			type: 'GET'
		}) //$.ajax
		.then(function() {
			alert('Goodbye!');
			$('.section').addClass('hide');
			$('#logout').addClass('hide');
			$('#login-page').removeClass('hide');
		}); //.then function
	}); //$(#logout)

}); //$(document).ready(function()



function displayMap() {
	navigator.geolocation.getCurrentPosition(function(position) {
    	var currentLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
    	var map = new google.maps.Map(document.getElementById('map'), {
	      center: currentLocation,
	      zoom: 13
	    }); //map
	    $.ajax('/restaurants', {
	    	type: 'GET',
	    	data: currentLocation
	    })
	    .then(function(results) {
	    	for (var i=0; i<results.length; i++) {
	    		var result = results[i];
	    		var $restaurantInfo = 
	    			$('<li class="restaurant-name">' + result.name + '</li>')
	    			.data('restaurant', result)
	    			.appendTo('ul#results-list');
	    	}	
	   }); //.then funtion(res)
	   
	}); //getCurrentPosition function
} //function displayMap()

function getRestaurantInfo(restaurant){
	alert('Getting restaurant details');
	console.log(restaurant.place_id);
	$.ajax('/restaurants/' + restaurant.place_id, {
		type: 'GET',
		data: {placeid: restaurant.place_id}
	}) //$.ajax
	.then(function(result) {
		$('#restaurant-details .phone').text(result.formatted_phone_number);
		$('#restaurant-details .website a').attr('href', result.website);
	});

} // getRestaurantInfo function

function getLatestWhines() {
	alert('Getting latest whines');
	var $whines = $('ul#whines');
	var $whine = $('<li></li>').appendTo($whines);
	

	$.ajax({
		type: 'GET',
		url: '/whines',
		dataType: 'json',
		
		success: function(whines) {
			$.each(whines, function(index, whine) {
				$('<span> Restaurant: ' + whine.id + '</span><br>').appendTo($whine);
				$('<span> By: ' + whine.author + ' on ' + whine.created +'</span><br>').appendTo($whine);
				$('<span> Food: ' + whine.food + '</span><br>').appendTo($whine);
				$('<span> Service: ' + whine.service + '</span><br>').appendTo($whine);
				$('<span> Cleanliness: ' + whine.cleanliness + '</span><br>').appendTo($whine);	
				$('<span> Price: ' + whine.price + '</span><br>').appendTo($whine);
				$('<span> Whine: ' + whine.review + '</span><br>').appendTo($whine);
				$whine.append('<br><br>');
			}); //$.each(review, function(index, whine)
		}, //success: function
		
		error: function() {
			alert('Error getting whines');
		} //error: function

	}); //$.ajax
} //function getLatestWhines()


