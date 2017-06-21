const chai		=	require('chai');
const chaiHttp	=	require('chai-http');
const should	=	chai.should();

const app		= require('../server.js');
const {Restaurant} = require('../models.js');
const {mockData} = require('../mock-data.js');

const {PORT}	= require('../config.js');


chai.use(chaiHttp);

describe('GET endpoint', function() {
	it('should return all existing restaurants', function() {
		let res;
		return chai.request(app)
			.get('/restaurants')
			.then(function(_res) {
				res = _res;
				res.should.have.status(200);
				res.body.restaurants.should.have.length.of.at.least(1);
			}); //.then function
	}); //it(should return all existing restaurants)

}); //describe GET endpoint