const chai		=	require('chai');
const chaiHttp	=	require('chai-http');
const should	=	chai.should();
const faker		=	require('faker');
const mongoose	=	require('mongoose');

const app	= require('../server.js');
const {Whine, User} = require('../models');
const {PORT, TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);
mongoose.Promise = global.Promise;




function generateAuthorData(){
	return {
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		email: faker.internet.email(),
		password: faker.internet.password()
	};
}

function seedAuthorData(){
	const seedAuthors = [];
	for (let i=1; i<=10; i++) {
    seedAuthors.push(generateAuthorData());
  		}
  	return seedAuthors;
	} //seedAuthorData function

function seedWhineData() {
	const seedWhines = [];
	for (let i=1; i<=10; i++) {
    seedWhines.push(generateWhineData());
  }
  return seedWhines;
 
}//function seedCommentData

function generateWhineData() {
	return {
		review: faker.lorem.sentences(),
		created: faker.date.past()
	};
} //function generateCommentData



describe('Whines API resource', function() {
	const authors = seedAuthorData();
	const whines = seedWhineData();
	const agent = chai.request.agent(app);

	before(function() {
		return mongoose.connect(TEST_DATABASE_URL);
	}); //before function

	beforeEach(function() {
		
		return User
			.insertMany(authors)
			.then(function(savedAuthors){
				whines.forEach(function(whine){
					const author = savedAuthors[1];
					whine.author = author;
				});
				return Whine.insertMany(whines);
			});

	}); //beforeEach function

	afterEach(function() {
		console.warn('Deleting whine database');
		return mongoose.connection.dropDatabase();
	}); //afterEach function

	after(function() {
		return mongoose.disconnect();
	}); //after function
	
	describe('Whine on GET endpoint', function() {
		it('should return all existing whines', function() {
			let res;
			return chai.request(app)
			.get('/whines')
			.then(function(_res) {
				console.log('test');
				res = _res;
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('array');
				res.body.length.should.be.at.least(1);
				res.body.forEach(function(whine) {
					comment.should.be.a('object');
				}); //.forEach function		
			}) //.then function
			.catch(function(){
				console.log('catch');
			});
		}); //it(should return all)

		it('should return whines with right fields', function() {
		//	let resWhine;
			return chai.request(app)
				.get('/whines')
				.then(function(res) {
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.a('array');
					res.body.length.should.be.at.least(1);

					res.body.forEach(function(whine) {
						whine.should.be.a('object');
						whine.should.include.keys(
							'id', 'review', 'created');
					}); //.forEach function
				}); //.then function(res)
		}); //it(should return whines with right fields)
	}); //describe(Whine on GET endpoint)


	describe('Whine on POST endpoint', function() {
		it('should add a whine', function() {
			const newWhine = {
				
				review: faker.lorem.sentences(2),
				created: faker.date.past()
			}; //const newComment

			return chai.request(app)
				.post('/whines')
				.send(newWhine)
				.then(function(res) {
					res.should.have.status(201);
					res.should.be.json;
					res.body.should.be.a('object');
					res.body.should.include.keys(
						'id', 'author', 'review', 'created');
					res.body.id.should.not.be.null;
					res.body.created.should.not.be.null;
					res.body.review.should.equal(newComment.review);
					res.body.author.should.equal(newComment.author);
				}); //.then function
		}); //it(should add a new comment)
	}); //describe(Whine review on POST endpoint)


	describe('Whine on DELETE endpoint', function() {
		it('should delete whine on DELETE', function() {
			return chai.request(app)
				.get('/whines')
				.then(function(res) {
					return chai.request(app)
					.delete(`/whines/${res.body[0].id}`);
				}) //.then function .delete
				.then(function(res) {
					res.should.have.status(204);
				}); //.then function status(204)
		}); //it(should delete comment on delete)
	}); //describe(Whine on DELETE endpoint)


	describe('Whine on PUT endpoint', function() {
		it('should update whine on PUT', function() {
			const updateWhine = {
				review: faker.lorem.sentences(2)
			}; //const updateComment

			return Whine
				.findOne()
				.exec()
				.then(function(whine) {
					updateWhine.id = whine.id;
					return chai.request(app)
						.put(`/whines/${whine.id}`)
						.send(updateWhine);
				})
				.then(function(res) {
					res.should.have.status(201);
					return Whine.findById(updateWhine.id).exec();
				})
				.then(function(whine) {
					whine.review.should.equal(updateWhine.review);
				});
		}); //it(should update comment on PUT)
	}); //describe (Whine on PUT endpoint)



}); //describe(Comments API resource)