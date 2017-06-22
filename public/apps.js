$(document).ready(function() {
	$.getJSON('/data')
		.then(function(res){
			$('body').append('<p>' + JSON.stringify(res) + '</p>');
			console.log(JSON.stringify(res));
		});
}); //document.ready
