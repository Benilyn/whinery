const express	=	require('express');
const app		=	express();

const {Restaurant, Comment} = require('./models');
const {PORT} = require('./config');
const mockData = require('./mock-data');

app.use(express.static('public'));

app.listen(process.env.PORT||8080);

app.get('/data', (req, res) => {
	res.json({mockData});
}); //app.get(/data)

module.exports	=	app;