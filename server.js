const express	=	require('express');
const app		=	express();
const bodyParser =	require('body-parser');
const mongoose = require('mongoose');
//const https = require('https');
const fs = require('fs');
const morgan = require('morgan');
app.use(morgan('dev'));
/*
const options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
};
*/
mongoose.Promise = global.Promise;


const restaurantsRouter = require('./router/restaurantsRouter');
const whinesRouter = require('./router/whinesRouter');
const usersRouter = require('./router/usersRouter');
const loginRouter = require('./router/loginRouter');
const logoutRouter = require('./router/logoutRouter');

const {Restaurant, Whine, User} = require('./models');
const {PORT, DATABASE_URL, TEST_DATABASE_URL} = require('./config');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

const localStrategy = require('passport-local').Strategy;
passport.use(new localStrategy(  
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
        User.findOne({ email: email })
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


app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/restaurants', restaurantsRouter);
app.use('/whines', whinesRouter);
app.use('/users', usersRouter);
app.use('/login',loginRouter);
app.use('/logout', logoutRouter);

if (require.main === module) {
	console.log('testing');
	mongoose.connect(DATABASE_URL, {useMongoClient: true});
  app.listen(PORT);
	//https.createServer(options, app).listen(PORT);
}

app.get('/loggedin', (req, res) => {
  if (!(req.user)) {
    const message = 'No user logged in';
    console.error(message);
    res.sendStatus(401);
  }
  else{
      res.sendStatus(200);
      console.log(req.user);
  }
});












module.exports	=	app;