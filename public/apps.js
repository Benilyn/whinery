$.noConflict();



$(document).ready(function() {
	isLoggedIn();

	$('#sign-up').click(function() {
		$('.section').addClass('hide');
		$('#signup-page input').val('');
		$('#signup-page').dialog({
			title: "Sign Up",
			buttons: {
				'Submit': function(){
					signUp();
				}, //submit button
				'Reset': function(){
					$('input').val('');
				} //reset button
			}, //buttons
			close: function(){
				$('#login-page').removeClass('hide');
				$('#sign-up').removeClass('hide');
			}
		}); //.dialog box
		$('#signup-page').removeClass('hide');
	}); //$('#sign-up').click(function()


	$('ul#results-list').on('click', 'li', function() {
		var restaurant = $(this).data('restaurant');
		console.log($(this).data('restaurant'));
		$('#back-to-search-results').removeClass('hide');
		$('.section').addClass('hide');
		$('#restaurant-info').data('restaurant', restaurant).removeClass('hide');
		$('#write-whine').removeClass('hide');
		$('#whine-reviews').removeClass('hide');
		
		var price = '$';
		$('#restaurant-details .name').text(restaurant.name);
		$('#restaurant-details .address').text(restaurant.formatted_address);
		$('#restaurant-details .price').text('Price: ' + (price.repeat(restaurant.price_level)));
		 
		getRestaurantInfo(restaurant);
		getRestaurantWhines(restaurant);

	}); //$('ul#results-list').on('click', 'li', function()

	//Write Review 
	$('#write-whine').click(function() {
		var restaurant = $('#restaurant-info').data('restaurant');
		$('#whine-reviews').addClass('hide');
		$('#write-whine').addClass('hide');
	//	$('#whine-form').removeClass('hide');
		clearForm();
		$('#whine-form').dialog({
			title: "Restaurant Whine",
			buttons: {
				'Add Whine': function(){
					addWhine();
				}, //Add Whine buttone
				'Reset': function(){
					clearForm();
				} //reset button
			}, //buttons
			close: function(){
				$('#whine-reviews').removeClass('hide');
				$('#write-whine').removeClass('hide');
			}
		}); //$('#whine-form').dialog
	}); //$('#write-whine').click(function()

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

	//Add Whine
	function addWhine(event) {
	
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
			$('#whine-form').dialog('close');
			alert('Thank you for your whine.');
			$('#write-whine').removeClass('hide');
			$('#whine-reviews').removeClass('hide');
			getRestaurantWhines(restaurant);
		
		}); //.then function	
	}	//addWhine function

	
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
		});	//.then function
	}); //$('#login-page form').submit(function(event)

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

	$('ul#restaurant-whines').on('click', '.edit', function() {
		var whine = $(this).parent().data('whine_id');
		var whine_element = $(this).parent();
		console.log(whine);
	//	whine_element.addClass('edit-whine');
	//	$('.edit').addClass('hide');
	//	$('.to-edit').removeClass('hide');
		$('#write-whine').addClass('hide');
		$('#whine-reviews').addClass('hide');
		$('#edit-whine-form').dialog({
			title: 'Edit review',
			buttons: {
				'Delete': function() {
					deleteReview(whine);
				}, //delete button
				'Save': function() {
					saveEditReview(whine);
				}, //save button
				Cancel: function() {
					$('#edit-whine-form').dialog('close');
					$('#write-whine').removeClass('hide');
					$('#whine-reviews').removeClass('hide');
				} //cancel button
			},
			close: function(){
				$('#write-whine').removeClass('hide');
				$('#whine-reviews').removeClass('hide');
			}
		}); //$('#edit-whine-form').dialog
		console.log("editing", whine);
	}); //$('ul#restaurant-whines').on('click', '.edit', function()

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
			$('#sign-up').removeClass('hide');
		});
		
	})
	.fail(function(){
		console.log('You must log in to see whines');
		$('#login-page').removeClass('hide');
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
		$('#signup-page').dialog('close');
		alert('Thank you for signing up.');
		$('#login-page').removeClass('hide');
		$('#sign-up').removeClass('hide');
	}); //.then function
} //signUp function

function deleteReview(whine) {
//	var whine = $(this).parent().data('whine_id');
//		var whine_element = $(this).parent();
//		console.log(whine_element);
		var restaurant = $('#restaurant-info').data('restaurant');
		console.log('deleting', whine);
		alert('need to delete restaurant whine');

		$.ajax({
			type: 'DELETE',
			url: '/whines/' + whine
		}) //$.ajax
		.then(function(){
			
			console.log('removing whine id ' + whine);
			$('#edit-whine-form').dialog('close');
			$('.section').addClass('hide');
			$('#restaurant-info').removeClass('hide');
			$('#write-whine button').removeClass('hide');
			$('#whine-reviews').removeClass('hide');
			getRestaurantWhines(restaurant);

		//	$('#restaurant-whines').load('/whines #restaurant-whines');
		}); //.then
} //deleteReview funtion

function saveEditReview(whine) {
//	var whine = $(this).parent().data('whine_id');
		var whine_element = $(this).parent();
		console.log('saving edit', whine);


		var restaurant = $('#restaurant-info').data('restaurant');
		const editedWhineData = {
			food: $('#edit-whine-form [name="food"]:checked').val(),
			service: $('#edit-whine-form [name="service"]:checked').val(),
			cleanliness: $('#edit-whine-form [name="cleanliness"]:checked').val(),
			price: $('#edit-whine-form [name="price"]:checked').val(),
			review: $('#edit-whine-form [name="whine-review"]').val(),
			id: whine
		};
		$.ajax({
			contentType: 'application/json',
			data: JSON.stringify(editedWhineData),
			type: 'PUT',
			url: '/whines/' + whine
		}) //$.ajax
		.then(function(){
			console.log('saving edit for whine ' + whine);
			$('#edit-whine-form').dialog('close');
			$('.section').addClass('hide');
			$('#restaurant-info').removeClass('hide');
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
	      zoom: 13
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
	
	$.ajax({
		type: 'GET',
		url: '/whines',
			
		success: function(whines) {
			var $whines = $('ul#whines');
			$whines.empty();

			$.each(whines, function(index, whine) {
				var $whine = $('<li></li>').appendTo($whines);

				$('<span> Restaurant: ' + whine.restaurantName + '</span><br>').appendTo($whine);
				$('<span> By: ' + whine.author + ' on ' + whine.created +'</span><br>').appendTo($whine);
				$('<span> Food: ' + whine.food + '</span><br>').appendTo($whine);
				$('<span> Service: ' + whine.service + '</span><br>').appendTo($whine);
				$('<span> Cleanliness: ' + whine.cleanliness + '</span><br>').appendTo($whine);	
				$('<span> Price: ' + whine.price + '</span><br>').appendTo($whine);
				
				if (whine.review) {
					$('<span> Whine: ' + whine.review + '</span><br>').appendTo($whine);
				} //if (whine.review)
				$whine.append('<br><br>');
			}); //$.each(whines, function(index, whine)
		}, //success: function
		
		error: function() {
			alert('Error getting whines');
		} //error: function
	}); //$.ajax
} //function getLatestWhines()

function getRestaurantWhines(restaurant) {
	$('<li> Getting whines for restaurants </li><br>').appendTo('ul#restaurant-whines');
	
	$.ajax({
		type: 'GET',
		url: '/whines',
		data: {restaurant: restaurant.place_id},

		success: function(whines) {
			var $whines = $('ul#restaurant-whines');
			$whines.empty();
			console.log(whines);
		
			$.each(whines, function(index, whine) {
			//	console.log(whine.id);
	    			
				var $whine = $('<li class="restaurant-whine"></li>').data('whine_id', whine.id).appendTo($whines);
				
				$('<span class="author-create"> ' + whine.author + ' on ' + whine.created +'</span><br>').appendTo($whine);
				$('<span> Food: ' + whine.food + '</span><br>').appendTo($whine);
				$('<span> Service: ' + whine.service + '</span><br>').appendTo($whine);
				$('<span> Cleanliness: ' + whine.cleanliness + '</span><br>').appendTo($whine);	
				$('<span> Price: ' + whine.price + '</span><br>').appendTo($whine);
				if (whine.review) {
					$('<span> Whine: ' + whine.review + '</span><br>').appendTo($whine);
				} //if (whine.review)$('<span> Whine: ' + whine.review + '</span><br>').appendTo($whine);
				
				if(whine.owned) {
					$('<button class="edit">Edit</button><br>').appendTo($whine);
				}
				
			}); //$.each(whines, function(index, whine)
			
		}
	}); //$.ajax
} //function getRestaurantWhines() 

	






