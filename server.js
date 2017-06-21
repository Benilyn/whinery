const express	=	require('express');
const app		=	express();

const {Restaurant, Comment} = require('./models');
const {PORT} = require('./config');

app.use(express.static('public'));

app.get('/data', (req, res) => {
	res.json({name: "ABC"});
}); //app.get(/data)

module.exports	=	app;