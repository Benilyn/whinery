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
}); //router.get


router.post('/', (req, res) => {
	const requiredFields = [
		'name',
		'cuisine',
		'address',
		'city',
		'state'
	]; //requiredFields
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`;
			console.error(message);
		return res.status(400).send(message);
		} //if (!(field in req.body))
	} //for (let i=0)

	Restaurant
		.create({
			name: req.body.name,
			cuisine: req.body.cuisine,
			address: req.body.address,
			city: req.body.city,
			state: req.body.state,
			zipcode: req.body.zipcode})
		.then(
			restaurant => res.status(201).json(restaurant.apiRepr()))
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal server error'});
		});
}); //router.post


module.exports = router;