const express = require('express');
const router = express.Router();

const {Comment} = require('../models');
const {PORT, DATABASE_URL} = require('../config');

router.post('/', (req, res) => {
	const requiredFields = ['author', 'review'];
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`;
			console.error(message);
		return res.status(400).send(message);
		} //if (!(field in req.body))
	} //for (let i=0)

	Comment
		.create({
			author: req.body.author,
			review: req.body.review,
			restaurant: req.body.restaurant
			})
		.then(
			comment => res.status(201).json(comment.apiRepr()))
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal server error'});
		});
}); //router.post

router.get('/', (req, res) => {
	Comment
		.find()
		.limit(10)
		.exec()
		.then(comment => {
			res.json(
				comment.map(
					(comment) => comment.apiRepr())
			);
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({message: "Internal server error"});
		});
}); //router.get

router.get('/:id', (req, res) => {
	Comment
		.findById(req.params.id)
		.exec()
		.then(comment => res.json(comment.apiRepr()))
		.catch(err => {
			console.error(err);
			res.status(500).json({error: "Something went wrong"});
		}); //.catch(err)
}); //router.get(/:id)

router.delete('/:id', (req, res) => {
	Comment
		.findByIdAndRemove(req.params.id)
		.exec()
		.then(() => {
			console.log(`Deleted comment \`${req.params.id}\``);
			res.status(204).end();
		});
}); //router.delete

router.put ('/:id', (req, res) => {
	if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
		res.status(400).json({
			err: "Request path id and request body id values must match"
		}); //res.status
	}

	const updated = {};
	const updateableFields = ['author', 'review'];
	updateableFields.forEach(field => {
		if (field in req.body) {
			updated[field] = req.body[field];
		} //if (field in req.body)
	}); //updateableFields.forEach

	Comment
		.findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
		.exec()
		.then(updatedComment => res.status(201).json(updatedComment.apiRepr()))
		.catch(err => res.status(500).json({message: "Something went wrong"}));
}); //router.put(/:id)


module.exports = router;