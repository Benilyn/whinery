const express	=	require('express');
const app		=	express();
const bodyParser =	require('body-parser');
const mongoose = require('mongoose');
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
};

mongoose.Promise = global.Promise;


const restaurantsRouter = require('./router/restaurantsRouter');
const commentsRouter = require('./router/commentsRouter');
const usersRouter = require('./router/usersRouter');

const {Restaurant, Comment, User} = require('./models');
const {PORT, DATABASE_URL, TEST_DATABASE_URL} = require('./config');
const mockData = require('./mock-data');

const session = require('express-session');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));



app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/restaurants', restaurantsRouter);
app.use('/comments', commentsRouter);
app.use('/users', usersRouter);



app.get('/data', (req, res) => {
	res.json(mockData.restaurants);
}); //app.get(/data)

app.get('/data/:id', (req, res) => {
	const index = req.params.id;
	const restaurant = mockData.restaurants[index];

	res.render('restaurant.ejs', {restaurant});
	
}); //app.get(data:id)



if (require.main === module) {
	console.log('testing');
	mongoose.connect(DATABASE_URL);
	https.createServer(options, app).listen(PORT);
}










module.exports	=	app;