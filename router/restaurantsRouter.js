const express = require('express');
const router = express.Router();
const maps = require('@google/maps').createClient({
	key: 'AIzaSyC4Lq366S1SDP6j4iMrFUnbgwnsC4e6gU4',
	Promise: global.Promise
});


const {Restaurant} = require('../models');
const {PORT, DATABASE_URL} = require('../config');
/*
router.get('/', (req, res) => {
	res.json(Restaurant.get());
}); //router.get
*/
router.get('/', (req, res) => {
	maps.places({
		type: 'restaurant',
		location: [req.query.lat, req.query.lng]
	}) //maps.places
	.asPromise()
	.then(function(data) {
		res.json(data.json.results.slice(10));
		
	});
	
	console.log(req.query);
	
}); //router.get


// create handler here to get maps.place details (id should be restaurant place_id)

router.get('/:id', (req, res) => {
	maps.place({
		placeid: req.params.id
	})
	.asPromise()
	.then(function(data) {
		res.json(data.json.result);
	});
	console.log(req.params.id);
}); //router.get('/:id)')







module.exports = router;









