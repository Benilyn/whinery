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

describe('Restaurant on POST endpoint', function() {

	it('should add a new restaurant', function() {
		const newRestaurant = {
			name: "Testing Restaurant Name",
			cuisine: "American",
			address: "123 Test Drive Ave.",
			city: "Wala Wala",
			state: "CA"
		}; //const newRestaurant

		return chai.request(app)
			.post('/restaurants')
			.send(newRestaurant)
			.then(function(res) {
				res.should.have.status(201);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.should.include.keys(
					'id', 'name', 'cuisine', 'address', 'city', 'state');
				res.body.id.should.not.be.null;
				res.body.should.deep.equal(Object.assign(newRestaurant, {
					id: res.body.id
				})); //res.body.should.deep.equal
			}); //.then function
	}); //it(should add a new restaurant)
}); //describe(Restaurant on POST endpoint)