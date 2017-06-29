const chai		=	require('chai');
const chaiHttp	=	require('chai-http');
const should	=	chai.should();

const app		= require('../server.js');


chai.use(chaiHttp);

describe('Restaurant on GET endpoint', function() {

	it('should return all existing restaurants', function() {
		let res;
		return chai.request(app)
			.get('/restaurants')
			.then(function(_res) {
				res = _res;
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('array');
				res.body.length.should.be.at.least(1);
				res.body.forEach(function(restaurant) {
					restaurant.should.be.a('object');
				}); //.forEach function
			}); //.then function
	}); //it(should return all existing restaurants)

	it('should return restaurants with right fields', function() {
		let resRestaurant;
		return chai.request(app)
			.get('/restaurants')
			.then(function(res) {
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('array');
				res.body.length.should.be.at.least(1);

				res.body.forEach(function(restaurant) {
					restaurant.should.be.a('object');
					restaurant.should.include.keys(
						'id', 'name', 'cuisine', 'address', 'city', 'state');
				}); //.forEach function
			});
	}); //it(should return restaurants with the right fields)
}); //describe(Restaurant on GET point)
