$.noConflict();

$(document).ready(function() {
	isLoggedIn();

// signup
	$('#sign-up').click(function() {
		$('.section').addClass('hide');
		$('#signup-page').removeClass('hide');
	//	$('#signup-page input').val('');
	}); //$('#sign-up').click(function()

	$('#submit-signup').click(function() {
		signUp();
		$('.section').addClass('hide');
		$('#login-page').removeClass('hide');
	}); //$('.signup-page').submit(function() 

	$('#cancel-signup').click(function() {
		$('#signup-page').addClass('hide');
		$('#login-page').removeClass('hide');
		$('#demo').removeClass('hide');
		$('#sign-up').removeClass('hide');
	}); //$('#cancel-signup').click(function()

// login	
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
			$('#whineryNav').removeClass('hide');
		}) //.then function
		.fail(function() {
			alert('Email address and password does not match. Please try again.');
		}); //.fail
	}); //$('#login-page form').submit(function(event)

// demo login
	$('#demo-button').click(function() {
		console.log('Guess logged');	
		$('.section').addClass('hide');
		$('#search-result').removeClass('hide'); 
		displayMap();
		$('#whineryNav').removeClass('hide');
		$('#logout').addClass('hide');
	}); //$('#demo-button').click(function()	

// click on one of the search-result	
	$('ul#results-list').on('click', 'li', function() {
		var restaurant = $(this).data('restaurant');
		$('#back-to-search-results').removeClass('hide');
		$('.section').addClass('hide');
		$('#restaurant-info').data('restaurant', restaurant).removeClass('hide');
		$('#write-whine').removeClass('hide');
		$('#whine-reviews').removeClass('hide');
		 
		getRestaurantInfo(restaurant);
		getRestaurantWhines(restaurant);
	}); //$('ul#results-list').on('click', 'li', function()


// click on one of the restaurant name on whines
	$('ul#whines').on('click', 'li', function() {
		var restaurantId = $(this).data('restaurantId');
		$('.section').addClass('hide');
		$('#restaurant-info').removeClass('hide');
		$('#write-whine').removeClass('hide');
		$('#whine-reviews').removeClass('hide');
		
		getRestaurantInfo({place_id: restaurantId});
		getRestaurantWhines({place_id: restaurantId});
	}); //$('ul#whines').on('click', 'a', function()	

//Write Review 
	$('#write-whine').click(function() {
		var restaurant = $('#restaurant-info').data('restaurant');
		$('#whine-reviews').addClass('hide');
		$('#write-whine').addClass('hide');
		$('#whine-form').removeClass('hide');
		$('#write-whine-buttons').removeClass('hide');
		clearForm();
	}); //$('#write-whine').click(function()

	$('#cancel-whine').click(function() {
		$('#whine-form').addClass('hide');
		$('#write-whine').removeClass('hide');
		$('#whine-reviews').removeClass('hide');
	}); //$('#cancel-whine').click(function()

	$('#submit-whine').click(function() {
		addWhine();
	}); //$('#submit-whine').click(function()

// topNav
	$('#back-to-search-results').click(function(event) {
		event.preventDefault();
		$('#back-to-search-results').addClass('hide');
		$('.section').addClass('hide');
		$('#search-result').removeClass('hide');
	}); //$('#back-button').click(function(event)

	$('#get-latest-whines').click(function(event) {
		event.preventDefault();
		$('#back-to-search-results').removeClass('hide');
		$('.section').addClass('hide');
		$('#latest-feeds').removeClass('hide');
		getLatestWhines();
	}); //$('#back-button').click(function(event)

// logout
	$('#logout').click(function(event) {
		event.preventDefault();
		$.ajax('/logout', {
			type: 'GET'
		}) //$.ajax
		.then(function() {
			alert('Goodbye!');
			window.location.reload();	
		}); //.then function	
	}); //$(#logout)


// edit whine
	$('ul#restaurant-whines').on('click', '#edit', function() {
		var whine = $(this).closest('li').data('whine');
		$('#edit-whine-form').data('whine', whine);
		$('#write-whine').addClass('hide');
		$('#whine-reviews').addClass('hide');
		$('#edit-whine-form').data("whine_id", whine.id);
		$('#edit-whine-form').removeClass('hide');
		$('#edit-whine-buttons').removeClass('hide');

		$('#edit-whine-form input[name=food]').val([whine.food]);
		$('#edit-whine-form input[name=service]').val([whine.service]);
		$('#edit-whine-form input[name=price]').val([whine.price]);
		$('#edit-whine-form input[name=cleanliness]').val([whine.cleanliness]);
		$('#edit-whine-form textarea[name=whine-review]').val([whine.review]);			
	}); //$('ul#restaurant-whines').on('click', '#edit', function()

	$('#submit-edit').click(function() {
		var whine = $(this).closest('#edit-whine-form').data('whine');
		saveEditReview(whine);
	}); //$('#submit-edit').click(function()
 
	$('#cancel-edit').click(function() {
		$('#edit-whine-form').addClass('hide');
		$('#write-whine').removeClass('hide');
		$('#whine-reviews').removeClass('hide');
	}); //$('#cancel-edit').click(function()

// delete whine
	$('ul#restaurant-whines').on('click', '#delete', function() {
		var whine = $(this).closest('li').data('whine');
		var confirmDelete = confirm('Are you sure you want to delete this whine?');
		if (confirmDelete === true) {
			alert('Deleteing whine');
			deleteReview(whine);	
		}
	});

}); //$(document).ready(function()


function isLoggedIn() {	
	$.ajax('/loggedin', {
		type: 'GET'
	}) //$.ajax
	.then(function(res){
		$.ajax('logout', {
			type: 'GET'
		})
		.then(function(){
			$('#login-page').removeClass('hide');
			$('#demo').removeClass('hide');
			$('#sign-up').removeClass('hide');
		});	
	})
	.fail(function(){
		console.log('You must log in to see whines');
		$('#login-page').removeClass('hide');
		$('#demo').removeClass('hide');
		$('#sign-up').removeClass('hide');
	});
} //isLoggedIn function


function signUp() {
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
		$('#signup-page').addClass('hide');
		alert('Thank you for signing up.');
		$('#login-page').removeClass('hide');
		$('#demo').removeClass('hide');
		$('#sign-up').removeClass('hide');
	}); //.then function
} //signUp function


function addWhine() {	
	event.preventDefault();	
	var restaurant = $('#restaurant-info').data('restaurant');
	const whineData = {
		food: $('#whine-form [name="food"]:checked').val(),
		service: $('#whine-form [name="service"]:checked').val(),
		cleanliness: $('#whine-form [name="cleanliness"]:checked').val(),
		price: $('#whine-form [name="price"]:checked').val(),
		review: $('#whine-form [name="whine-review"]').val(),
		restaurant: restaurant.place_id,
		restaurantName: restaurant.name
	}; //whineData
	$.ajax('/whines', {
		contentType: 'application/json',
		data: JSON.stringify(whineData),
		type: 'POST'}) 
	.then(function(res) {
		alert('Thank you for your whine.');
		$('#whine-form').addClass('hide');
		$('#write-whine').removeClass('hide');
		$('#whine-reviews').removeClass('hide');
		getRestaurantWhines(restaurant);	
	}) //.then function	
	.fail(function(err) {
 		alert('You must login to write whine.');
 		$('#whine-form').addClass('hide');
 		$('#write-whine').removeClass('hide');
 		$('#whine-reviews').removeClass('hide');
 		getRestaurantWhines(restaurant);



	});
}	//addWhine function


function deleteReview(whine) {
		var restaurant = $('#restaurant-info').data('restaurant');
		$.ajax({
			type: 'DELETE',
			url: '/whines/' + whine.id
		}) //$.ajax
		.then(function(){		
			$('#edit-whine-form').addClass('hide');
			$('.section').addClass('hide');
			$('#restaurant-info').removeClass('hide');
			$('#write-whine button').removeClass('hide');
			$('#whine-reviews').removeClass('hide');
			getRestaurantWhines(restaurant);
		}); //.then
} //deleteReview funtion


function saveEditReview(whine) {
		var restaurant = $('#restaurant-info').data('restaurant');
		const editedWhineData = {
			food: $('#edit-whine-form [name="food"]:checked').val(),
			service: $('#edit-whine-form [name="service"]:checked').val(),
			cleanliness: $('#edit-whine-form [name="cleanliness"]:checked').val(),
			price: $('#edit-whine-form [name="price"]:checked').val(),
			review: $('#edit-whine-form [name="whine-review"]').val(),
			id: whine.id,
			author: whine.author,
			created: whine.created,
			restaurant: whine.restaurant,
			restaurantName: whine.restaurantName,
			owned: whine.owned
		}; //const editedWhineData
		$.ajax({
			contentType: 'application/json',
			data: JSON.stringify(editedWhineData),
			type: 'PUT',
			url: '/whines/' + whine.id
		}) //$.ajax
		.then(function(){
			$('#edit-whine-form').addClass('hide');
			$('#write-whine button').removeClass('hide');
			$('#whine-reviews').removeClass('hide');
			getRestaurantWhines(restaurant);
		}); //.then
} //saveEditReview funtion

function clearForm() {
	$(':radio').prop('checked', false);
	$('textarea').val('');
} // clearForm function


function displayMap() {
	navigator.geolocation.getCurrentPosition(function(position) {
    	var currentLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
    	var map = new google.maps.Map(document.getElementById('map'), {
	      center: currentLocation,
	      zoom: 12
	    }); //map
	    $.ajax('/restaurants', {
	    	type: 'GET',
	    	data: currentLocation
	    })
	    .then(function(results) {	   
	    	var currentPosition = new google.maps.Marker({
			    	position: currentLocation,
			    	map: map,
			    	icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
			    	label: 'You are here',
		    	}); //currentPosition
	    	var labels = 'ABCDEFGHIJ';
	    	for (var i=0; i<results.length; i++) {
	    		var result = results[i];	
	    		var marker = new google.maps.Marker({
					map: map,
					position: result.geometry.location,
					label: labels[i],
				});	    		
	    		var $restaurantInfo = 
	    			$('<li class="restaurant-name">' + 
	    				'   ' + labels[i] + 
	    				' : ' + result.name + 
	    				'</li>')
	    			.data('restaurant', result)
	    			.appendTo('ul#results-list');
	    	} //for
	   }); //.then funtion(res)	   
	}); //getCurrentPosition function
} //function displayMap()


var infoWINDOW;
function createMarker(restaurant) {
	var marker = new google.maps.Marker({
		map: map,
		position: restaurant.geometry.currentLocation,
	});
	google.maps.event.addListener(marker, 'click', function() {
		if (infoWINDOW) { infoWINDOW.close(); }
		infoWINDOW = infowindow;
		infowindow.setContent(restaurant.name);
		infowindow.open(map, this);
	}); //google.maps.event.addListener
} //function createMarker(restaurant)

function getRestaurantInfo(restaurant){
	$.ajax('/restaurants/' + restaurant.place_id, {
		type: 'GET',
		data: {placeid: restaurant.place_id}
	}) //$.ajax
	.then(function(result) {
		console.log(result);
			var price = '$';
		$('#restaurant-details .name').text(result.name);
		$('#restaurant-details .address').text(result.formatted_address);
		$('#restaurant-details .price').text('Price: ' + (price.repeat(result.price_level)));
		$('#restaurant-details .phone').text(result.formatted_phone_number);
		$('#restaurant-details .website a').attr('href', result.website);
	}); //.then function	
} // getRestaurantInfo function


function getLatestWhines() {	
	$.ajax({
		type: 'GET',
		url: '/whines',			
		success: function(whines) {
		
			var $whines = $('ul#whines');
			$whines.empty();
			$.each(whines, function(index, whine) {
				
				var $whine = $('<li></li>').data('restaurantId', whine.restaurant).appendTo($whines);
				$('<span class="whineName ellipsis"><a href=#>' + whine.restaurantName + '</a></span>').appendTo($whine);
				$('<span> Food: ' + whine.food + '</span>').appendTo($whine);
				$('<span> Service: ' + whine.service + '</span>').appendTo($whine);
				$('<span> Cleanliness: ' + whine.cleanliness + '</span>').appendTo($whine);	
				$('<span> Price: ' + whine.price + '</span>').appendTo($whine);				
				if (whine.review) {
					$('<span class="wrap"> Whine: ' + whine.review + '</span>').appendTo($whine);
				} //if (whine.review)
				$('<span class="whineAuthor"> Whined by: ' + whine.author + ' on ' + whine.created + '</span>').appendTo($whine);
			}); //$.each(whines, function(index, whine)
		}, //success: function		
		error: function() {
			alert('Error getting whines');
		} //error: function
	}); //$.ajax
} //function getLatestWhines()

function getRestaurantWhines(restaurant) {
	console.log(restaurant);	
	$.ajax({
		type: 'GET',
		url: '/whines',
		data: {restaurant: restaurant.place_id},
		success: function(whines) {
			var $whines = $('ul#restaurant-whines');
			$whines.empty();
			
			if(whines.length === 0) {
				console.log(whines.length);
				$('<li class="no-restaurant-whine">No whines found</li>').appendTo($whines);
			} //if(whines.length === 0)
			else {
				$.each(whines, function(index, whine) {	
					var $whine = $('<li class="restaurant-whine"></li>').data('whine', whine).appendTo($whines);
					
					$('<span class="author-create"> ' + whine.author + ' on ' + whine.created +'</span>').appendTo($whine);
					$('<span> Food: ' + whine.food + '</span>').appendTo($whine);
					$('<span> Service: ' + whine.service + '</span>').appendTo($whine);
					$('<span> Cleanliness: ' + whine.cleanliness + '</span>').appendTo($whine);	
					$('<span> Price: ' + whine.price + '</span>').appendTo($whine);
					if (whine.review) {
						$('<span class="wrap"> Whine: ' + whine.review + '</span>').appendTo($whine);
					} //if (whine.review)
					if(whine.owned) {
						var $edit = $('<div id="div-edit"></div>').appendTo($whine);
						$('<button type="button" id="edit">Edit</button>').appendTo($edit);
						$('<button type="button" id="delete">Delete</button>').appendTo($edit);
					} //if(whine.owned)	
				}); //$.each(whines, function(index, whine)
			} //else			
		}, //success function
		error: function() {
			alert('Error getting restaurant whines');
		} //error: function
	}); //$.ajax
} //function getRestaurantWhines() 

	






