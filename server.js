const express	=	require('express');
const app		=	express();

const restaurantsRouter = require('./restaurantsRouter');

const {Restaurant, Comment} = require('./models');
const {PORT} = require('./config');
const mockData = require('./mock-data');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.listen(process.env.PORT||8080);

app.get('/data', (req, res) => {
	res.json(mockData.restaurants);
}); //app.get(/data)

app.get('/data/:id', (req, res) => {
	const index = req.params.id;
	const restaurant = mockData.restaurants[index];

	res.render('restaurant.ejs', {restaurant});
	
}); //app.get(data:id)

app.use('/restaurants', restaurantsRouter);

module.exports	=	app;