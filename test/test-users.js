const chai		=	require('chai');
const chaiHttp	=	require('chai-http');
const should	=	chai.should();
const faker		=	require('faker');
const mongoose	=	require('mongoose');

const app	= require('../server.js');
const {User} = require('../models');
const {PORT, TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);
mongoose.Promise = global.Promise;


function seedUsers() {
	console.log('seeding users');
	const users = [];
	for (i=1; i<=5; i++) {
		users.push(generateUsers());
	}
	return User.insertMany(users);
} //seedUsers function

function generateUsers() {
	return {
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		phone: faker.phone.phoneNumber(),
		email: faker.internet.email(),
		password: faker.internet.password()
	};
} //generateUsers function


describe('Users API resource', function() {

	before(function() {
		return mongoose.connect(TEST_DATABASE_URL);
	}); //before function

	beforeEach(function() {
		return seedUsers();
	}); //beforeEach function

	afterEach(function() {
		console.warn('Deleting User database');
		return mongoose.connection.dropDatabase();
	}); //afterEach function

	after(function() {
		return mongoose.disconnect();
	}); //after function


	describe('User GET endpoint', function() {
		it('should return all existing users', function() {
			let res;
			return chai.request(app)
				.get('/users')
				.then(function(_res) {
					res = _res;
					res.should.have.status(200);
					res.body.should.have.length.of.at.least(1);
				}); //.then function		
		}); //'should return all existing users', function()

		it('should return users with right fields', function() {
			return chai.request(app)
				.get('/users')
				.then(function(res) {
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.a('array');
					res.body.should.have.length.of.at.least(1);
					res.body.forEach(function(user) {
						user.should.be.a('object');
						user.should.include.keys(
							'id', 'firstName', 'lastName', 'email'
						);
					}); //forEach function
				}); //.then function
		}); //'should return users with right fields', function()
	}); //'User GET endpoint', function()

	describe('User POST endpoint', function() {
		it('should add a new user', function() {
			const newUser = {
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName(),
				phone: faker.phone.phoneNumber(),
				email: faker.internet.email(),
				password: faker.internet.password() 
			}; //const newUser

			return chai.request(app)
				.post('/users')
				.send(newUser)
				.then(function(res) {
					res.should.have.status(201);
					res.should.be.json;
					res.body.should.be.a('object');
					res.body.should.include.keys(
						'id', 'firstName', 'lastName', 'email');
					res.body.id.should.not.be.null;
					res.body.firstName.should.equal(newUser.firstName);
					res.body.lastName.should.equal(newUser.lastName);
					res.body.email.should.equal(newUser.email);
				}); //.then function
		}); //'should add a new user'
	}); //'User POST endpoint', function()

	describe('User DELETE endpoint', function() {
		it('should delete a user by id', function() {
			let user;
			return User
				.findOne()
				.exec()
				.then(function(_user) {
					user = _user;
					return chai.request(app).delete(`/users/${user._id}`);
				})
				.then(function(res) {
					res.should.have.status(204);
					return User.findById(user._id).exec();
				})
				.then(function(_user) {
					should.not.exist(_user);
				})
		}); //'should delete a user by id', function()
	}); //'User DELETE endpoint', function()

	describe('User PUT endpoint', function() {
		it('should update fields you send over', function() {
			const updateUser = {
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName(),
				phone: faker.phone.phoneNumber()
			};

			return User
				.findOne()
				.exec()
				.then(function(user) {
					updateUser.id = user.id;
					return chai.request(app)
						.put(`/users/${user.id}`)
						.send(updateUser);
				})
				.then(function(res) {
					console.log(res.body);
					res.should.have.status(201);
					res.body.firstName.should.equal(updateUser.firstName);
					res.body.lastName.should.equal(updateUser.lastName);
					res.body.phone.should.equal(updateUser.phone);
					return User.findById(updateUser.id).exec();
				})
				.then(function(user) {
					
					user.firstName.should.equal(updateUser.firstName);
					user.lastName.should.equal(updateUser.lastName);
					user.phone.should.equal(updateUser.phone);
				});
		}); //'should update fields you send over', function()
	}); //'User PUT endpoint', function()

	describe('test User login', function() {
		it('should login a user', function() {
			let user;
			return User
				.findOne()
				.exec()
				.then(function(_user) {
					user = _user;
					return chai.request(app).get(`/users/${user._id}`);
				})
				.then(function(res) {
					res.should.have.status(200);
					return User.findById(user._id).exec();
				})
				.then(function(user) {
					console.log(user);
					return chai.request(app)
						.post('/login')
						.send({email: user.email, password: user.password})
						.then(function(res) {
							res.should.have.status(200);
						});
				});
		}); //'should login a', function()





	}); //test User login
	
}); //describes 'Users API resource'











