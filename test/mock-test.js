const chai		=	require('chai');
const chaiHttp	=	require('chai-http');
const should	=	chai.should();

const app		= require('../server.js');
const {Restaurant} = require('../models.js');
const {mockData} = require('./mock-data.js');


chai.use(chaiHttp);