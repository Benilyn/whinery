const express	=	require('express');
const app		=	express();

const restaurantsRouter = require('./restaurantsRouter');

const {Restaurant, Comment} = require('./models');
const {PORT} = require('./config');
const mockData = require('./mock-data');

app.use(express.static('public'));

app.listen(process.env.PORT||8080);

app.get('/data', (req, res) => {
	res.json(mockData.restaurants);
}); //app.get(/data)

app.use('/restaurants', restaurantsRouter);

module.exports	=	app;