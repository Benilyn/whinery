$(document).ready(function() {
	$.getJSON('/data')
		.then(function(res){
			res.forEach(displayRestaurant);
		});

}); //document.ready


function displayRestaurant(restaurant, index) {
/*	$('.restaurants').append(
		'<a href="restaurantDetails.html">' +
		'<div><p>' + restaurant.name + '</p></div>' +
		'</a>');
*/	console.log(restaurant);
	$('.restaurants').append(
		`<a href="/data/${index}">
			<div>
				<ul>
					<li class='name'> ${restaurant.name} </li>
					<span class='address'> ${restaurant.address}</span><br>
						<span class='city'> ${restaurant.city}</span>
						<span class='state'> ${restaurant.state}</span>
						<span class='zip'> ${restaurant.zipcode}</span><br>
				</ul>
			</div>
		</a>`);
}


