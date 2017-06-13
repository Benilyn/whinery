const chai		=	require('chai');
const chaiHttp	=	require('chai-http');
const should	=	chai.should();

const app		= require('../server.js');


chai.use(chaiHttp);

describe('Index.html file', function() {

	it('should verify when you hit up root url', function() {
		return chai.request(app)
			.get('/')
			.then(function(res) {
				res.should.have.status(200);
				res.should.be.html;
			}); //.then
	}); //it(should verify)
}); //describe
