const chai		=	require('chai');
const chaiHttp	=	require('chai-http');
const should	=	chai.should();
const faker		=	require('faker');
const mongoose	=	require('mongoose');

const app	= require('../server.js');
const {Comment} = require('../models');
const {PORT, TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

function seedCommentData() {
  console.info('seeding comments');
  const seedComment = [];

  for (let i=1; i<=10; i++) {
    seedComment.push(generateCommentData());
  }
  // this will return a promise
  return Comment.insertMany(seedComment).catch(err => {
  	console.error(err);
  });
}; //function seedCommentData

function generateCommentData() {
	return {
		author: faker.name.firstName(),
		review: faker.lorem.sentences(),
		created: faker.date.past()
	};
}; //function generateCommentData

describe('Comments API resource', function() {
	before(function() {
		return mongoose.connect(TEST_DATABASE_URL);
	}); //before function

	beforeEach(function() {
		return seedCommentData();
	}); //beforeEach function

	afterEach(function() {
		console.warn('Deleting comments database');
		return mongoose.connection.dropDatabase();
	}); //afterEach function

	after(function() {
		return mongoose.disconnect();
	}); //after function


	describe('Comment on GET endpoint', function() {
		it('should return all existing comments', function() {
			let res;
			return chai.request(app)
			.get('/comments')
			.then(function(_res) {
				res = _res;
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('array');
				res.body.length.should.be.at.least(1);
				res.body.forEach(function(comment) {
					comment.should.be.a('object');
				}); //.forEach function			
			}) //.then function	
		}); //it(should return all)

		it('should return comments with right fields', function() {
			let resComment;
			return chai.request(app)
				.get('/comments')
				.then(function(res) {
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.a('array');
					res.body.length.should.be.at.least(1);

					res.body.forEach(function(restaurant) {
						restaurant.should.be.a('object');
						restaurant.should.include.keys(
							'id', 'author', 'review', 'created');
					}); //.forEach function
				}); //.then function(res)
		}); //it(should return comments with the right fields)
	}); //describe(Comment on GET endpoint)



}); //describe(Comments API resource)