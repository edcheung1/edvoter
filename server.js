'use strict'

var express = require('express');
var routes = require('./src/routes/index.js');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

require('dotenv').load();

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use('/', express.static(process.cwd() + '/src'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

mongoose.connect(process.env.MONGO_URI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Could not connect to MongoDB server'));
db.once('open', () => {
	console.log('Connected to MongoDB server sucessfully!');

	routes(app);

	app.listen(app.get('port'), function() {
		console.log('Node app is running on port ', app.get('port'));
	})

})

