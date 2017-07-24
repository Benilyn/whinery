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

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

const localStrategy = require('passport-local').Strategy;
passport.use(new localStrategy(  
    {
        usernameField: 'email-address',
        passwordField: 'password'
    },
    function(email, password, done) {
        User.findOne({ email: email-address })
        	.then(function(user) {
	            if (!user || !user.password === password) {
	                return done(null, false, { message: 'Incorrect email or password.' });
	            }
	            done(null, user);
        	}); //.then function
    } //function(email, password, done)
)); //passport.use

passport.serializeUser(function(user, done) {  
    done(null, user.id);
}); //passport.serializeUser

passport.deserializeUser(function(id, done) {  
    User.findOne({ _id: id })
    	.then(function(user) {
        	done(null, user);
    	}) //.then function
    .catch(function(err) {
        done(err, null);
    }); //.catch function
}); //passport.deserializeUser



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