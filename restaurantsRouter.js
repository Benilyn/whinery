const express = require('express');
const router = express.Router();

const {Restaurants} = require('./models');

router.get('/', (req, res) => {
	res.json(Restaurants.get());
}); //router.get

module.exports = router;