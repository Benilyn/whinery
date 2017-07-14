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


	describe('Comment on POST endpoint', function() {
		it('should add a new comment', function() {
			const newComment = {
				author: faker.name.firstName(),
				review: faker.lorem.sentences(2)
			}; //const newComment

			return chai.request(app)
				.post('/comments')
				.send(newComment)
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
	}); //describe(Comment on POST endpoint)


	describe('Comment on DELETE endpoint', function() {
		it('should delete comment on DELETE', function() {
			return chai.request(app)
				.get('/comments')
				.then(function(res) {
					return chai.request(app)
					.delete(`/comments/${res.body[0].id}`);
				}) //.then function .delete
				.then(function(res) {
					res.should.have.status(204);
				}); //.then function status(204)
		}); //it(should delete comment on delete)
	}); //describe(Comment on DELETE endpoint)


	describe('Restaurant on PUT endpoint', function() {
		it('should update comment on PUT', function() {
			const updateComment = {
				author: faker.name.firstName(),
				review: faker.lorem.sentences(2)
			}; //const updateComment

			return Comment
				.findOne()
				.exec()
				.then(function(comment) {
					updateComment.id = comment.id;
					return chai.request(app)
						.put(`/comments/${comment.id}`)
						.send(updateComment);
				})
				.then(function(res) {
					res.should.have.status(201);
					return Comment.findById(updateComment.id).exec();
				})
				.then(function(comment) {
					comment.author.should.equal(updateComment.author);
					comment.review.should.equal(updateComment.review);
				});
		}); //it(should update comment on PUT)
	}); //describe (Comment on PUT endpoint)



}); //describe(Comments API resource)