const express	=	require('express');
const app		=	express();

const {Restaurant, Comment} = require('./models');


app.use(express.static('public'));
app.listen(process.env.PORT||8080);

module.exports	=	app;