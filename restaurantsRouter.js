const express = require('express');
const router = express.Router();


const {Restaurant} = require('./models');
const {PORT, DATABASE_URL} = require('./config');
/*
router.get('/', (req, res) => {
	res.json(Restaurant.get());
}); //router.get
*/
router.get('/', (req, res) => {
	console.log('testing if it works');
	Restaurant
		.find()
		.limit(10)
		.exec()
		.then(restaurants => {
			res.json(
				restaurants.map(
					(restaurant) => restaurant.apiRepr())
			);
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({message: "Internal server error"});
		});
});

module.exports = router;