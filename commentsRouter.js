const express = require('express');
const router = express.Router();

const {Comment} = require('./models');
const {PORT, DATABASE_URL} = require('./config');

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
			})
		.then(
			comment => res.status(201).json(comment.apiRepr()))
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal server error'});
		});
}); //router.post

module.exports = router;