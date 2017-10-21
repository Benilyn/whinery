const express = require('express');
const router = express.Router();

const {Whine} = require('../models');
const {PORT, DATABASE_URL} = require('../config');

router.post('/', (req, res) => {
	if (!(req.user)) {
		const message = 'Authentication required';
		console.error(message);
	return res.status(401).send(message);
	}



	const requiredFields = [
		'food', 'service', 'cleanliness', 'price', 'restaurant'];
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		console.log(req.body);
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`;
			console.error(message);
		return res.status(400).send(message);
		} //if (!(field in req.body))
	} //for (let i=0)
	
	Whine
		.create({
			author: req.user,
			restaurant: req.body.restaurant,
			restaurantName: req.body.restaurantName,
			food: req.body.food,
			service: req.body.service,
			cleanliness: req.body.cleanliness,
			price: req.body.price,
			review: req.body.review
			}) //.create
		.then(
			whine => whine.populate('author'))
		.then(
			whine => res.status(201).json(whine.apiRepr()))
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal server error'});
		});
}); //router.post

router.get('/', (req, res) => {
	let created = {created: -1};
	let query = {};
	if (req.query.restaurant) {
		query.restaurant = req.query.restaurant;
	}
	Whine
		.find(query)
		.populate('author')
		.sort(created)
		.limit(15)
		.exec()
		.then(whine => {
			res.json(
				whine.map(
					(whine) => {
						console.log(whine);
						const data = whine.apiRepr();
						if (req.user) {
							data.owned = req.user.id == whine.author.id;
						}
						else {
							data.owned = false;
						}
						return data;

					} )
			);
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({message: "Internal server error"});
		});
}); //router.get

router.get('/:id', (req, res) => {
	let created = {created: -1};
	Whine
		.findById(req.params.id)
		.sort(created)
		.exec()
		.then(whine => res.json(whine.apiRepr()))
		.catch(err => {
			console.error(err);
			res.status(500).json({error: "Something went wrong"});
		}); //.catch(err)
}); //router.get(/:id)

router.delete('/:id', (req, res) => {
	Whine
		.findOneAndRemove({_id: req.params.id, author: req.user})
		.exec()
		.then((doc) => {
			console.log(doc);
			console.log(`Deleted whine \`${req.params.id}\``);
			res.status(204).end();
		});
}); //router.delete

router.put ('/:id', (req, res) => {
	if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
		return res.status(400).json({
			err: "Request path id and request body id values must match"
		}); //res.status
	}

	const updated = {};
	const updateableFields = [
		'food', 'service', 'cleanliness', 'price', 'review'];
	updateableFields.forEach(field => {
		if (field in req.body) {
			updated[field] = req.body[field];
		} //if (field in req.body)
	}); //updateableFields.forEach

	Whine
		.findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
		.exec()
		.then((updatedWhine) => {
			console.log(updatedWhine);
			res.status(201).json(updatedWhine.apiRepr())})
		.catch((err) => {
			console.log(err);
			res.status(500).json({message: "Something went wrong"})});
}); //router.put(/:id)


module.exports = router;