const chai		=	require('chai');
const chaiHttp	=	require('chai-http');
const should	=	chai.should();
const faker		=	require('faker');
const mongoose	=	require('mongoose');

const app	= require('../server.js');
const {Restaurant} = require('../models');
const {PORT, TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);
/*
function seedRestaurantData() {
  console.info('seeding restaurant data');
  const seedData = [];

  for (let i=1; i<=10; i++) {
    seedData.push(generateRestaurantData());
  }
  // this will return a promise
  return Restaurant.insertMany(seedData).catch(err => {
  	console.error(err);
  });
}; //function seedRestaurantData

// used to generate data to put in db
function generateCuisineType() {
  const cuisines = ['Italian', 'Thai', 'Colombian', 'Asian'];
  return cuisines[Math.floor(Math.random() * cuisines.length)];
}; //function generateCuisineType

function generateRestaurantData() {
 	return {
	    name: faker.company.companyName(),
	    cuisine: generateCuisineType(),
	    address: faker.address.streetAddress(), 
	    city: faker.address.city(), 
	    state: faker.address.state(),
	    zipcode: faker.address.zipCode()
    }; //return (faker)
}; //function generateRestaurantData

function tearDownDb() {
	console.warn('Deleting database');
	return mongoose.connection.dropDatabase();
}; //function tearDownDb

describe('Restaurant API resource', function() {
	before(function() {
	    //return runServer(TEST_DATABASE_URL);
	    return mongoose.connect(TEST_DATABASE_URL);
	});

	beforeEach(function() {
	    return seedRestaurantData();
	});

	afterEach(function() {
		return tearDownDb();
	});

	after(function() {
	    return mongoose.disconnect();
	});


	describe('Restaurant on GET endpoint', function() {

		it('should return all existing restaurants', function() {
			let res;
			console.log('testing');
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

	describe('Restaurant on DELETE endpoint', function() {
		it('should delete restaurant on DELETE', function() {
			return chai.request(app)
				.get('/restaurants')
				.then(function(res) {
					return chai.request(app)
					.delete(`/restaurants/${res.body[0].id}`);
				}) //.then function .delete
				.then(function(res) {
					res.should.have.status(204);
				}); //.then function status(204)
		}); //it(should delete restaurant on delete)
	}); //describe(Restaurant on DELETE endpoint)

	describe('Restaurant on PUT endpoint', function() {
		it('should update restaurant on PUT', function() {
			const updateRestaurant = {
				name: "Testing PUT",
				cuisine: "Asian",
			}; //const updateRestaurant

			return Restaurant
				.findOne()
				.exec()
				.then(function(restaurant) {
					updateRestaurant.id = restaurant.id;
					return chai.request(app)
						.put(`/restaurants/${restaurant.id}`)
						.send(updateRestaurant);
				})
				.then(function(res) {
					res.should.have.status(201);
					return Restaurant.findById(updateRestaurant.id).exec();
				})
				.then(function(restaurant) {
					restaurant.name.should.equal(updateRestaurant.name);
					restaurant.cuisine.should.equal(updateRestaurant.cuisine);
				});
		}); //it(should dupdate restaurant on PUT)
	}); //describe (Restaurant on PUT endpoint)


}); //describe(Restaurant API resource)
*/












