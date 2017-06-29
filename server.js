const express	=	require('express');
const app		=	express();
const bodyParser =	require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


const restaurantsRouter = require('./restaurantsRouter');

const {Restaurant, Comment} = require('./models');
const {PORT, DATABASE_URL, TEST_DATABASE_URL} = require('./config');
const mockData = require('./mock-data');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());




app.get('/data', (req, res) => {
	res.json(mockData.restaurants);
}); //app.get(/data)

app.get('/data/:id', (req, res) => {
	const index = req.params.id;
	const restaurant = mockData.restaurants[index];

	res.render('restaurant.ejs', {restaurant});
	
}); //app.get(data:id)

app.use('/restaurants', restaurantsRouter);
app.listen(PORT);
mongoose.connect(DATABASE_URL);

module.exports	=	app;