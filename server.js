'use strict'

var express = require('express');
var routes = require('./src/routes/index.js');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('express-jwt');
var cors = require('cors');

require('dotenv').load();

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use('/', express.static(process.cwd() + '/src'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

const authCheck = jwt({
	secret: new Buffer(process.env.AUTH0_SECRET),
	audience: process.env.AUTH0_CLIENT_ID
})

mongoose.connect(process.env.MONGO_URI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Could not connect to MongoDB server'));
db.once('open', () => {
	console.log('Connected to MongoDB server sucessfully!');

	routes(app, authCheck);

	app.listen(app.get('port'), function() {
		console.log('Node app is running on port ', app.get('port'));
	})

})

