const express	=	require('express');
const app		=	express();

const {Restaurant, Comment} = require('./models');
const {PORT} = require('./config');

app.use(express.static('public'));

module.exports	=	app;