'use strict'

var express = require('express')
// import routes from ('./routes/routes');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use('/', express.static(process.cwd() + '/src'));

app.route('/')
	.get(function(req, res) {
		console.log(process.cwd());
		res.sendFile(process.cwd() + '/index.html');
	})

app.listen(app.get('port'), function() {
	console.log('Node app is running on port ', app.get('port'));
})