
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
		console.log(restaurant.place_id);
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
		console.log(restaurant.place_id);
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

		//	getLatestWhines();
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
	    	console.log(results);
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
	console.log('getting restaurant details');
	console.log(restaurant.place_id);
	$.ajax('/restaurants/' + restaurant.place_id, {
		type: 'GET',
		data: {placeid: restaurant.place_id}
	})
	.then(function(result) {
		console.log(result);
		$('#restaurant-details .phone').text(result.formatted_phone_number);
		$('#restaurant-details .website a').attr('href', result.website);
	});

} // getRestaurantInfo function

function getLatestWhines(whines) {
	console.log('getting latest whines');
	$.ajax('/whines', {
		type: 'GET'
	})
	.then(function(results) {
		console.log('getting results for whines');
		console.log(results);
		for (var i=0; i<results.length; i++) {
			var result = results[i];
			console.log(result.restaurant);

			$('#whine .restaurant-name').text(result.restaurant);
			$('#whine .whine-post-date').text(result.created);
			$('#whine .whine-post-by').text(result.author);
			$('#whine .restaurant-food-rating').text(result.food);
			$('#whine .restaurant-service-rating').text(result.service);
			$('#whine .restaurant-cleanliness-rating').text(result.cleanliness);
			$('#whine .restaurant-price-rating').text(result.price);
			$('#whine .restaurant-comment').text(result.review);
		}
	}); //.then function
}


