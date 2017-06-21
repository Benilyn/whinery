$(document).ready(function() {
	$.getJSON('/data')
		.then(function(res){
			console.log(res);
		});
}); //document.ready