'use strict'

var mongoose = require('mongoose');
var Poll = require('../models/poll');

module.exports = function(app) {
	app.route('/')
		.get( (req, res) => {
			console.log(process.cwd());
			res.sendFile(process.cwd() + '/index.html');
		});
	app.route('/api/allpolls')
		.get( (req, res) => {
			Poll.find((err, polls) => {
				if(err) return console.error(err);
				res.send(polls);
			})
		})
		.post( (req, res) => {
			console.log(req.body);

			let poll = new Poll({
				name: req.body.name,
				id: req.body.id,
				value: 0
			});

			poll.save((err) => {
				if(err) return next(err);
				res.send({message: req.body.name + "'s poll has been added sucessfully!"});
			})

		})
		
	app.route('/api/allpolls/:pollId')
		.delete( (req,res) => {
			Poll.find({
				id: req.params.pollId
			}).remove(() => {
				res.send({message: req.params.pollId + "'s poll has been removed sucessfully!"});
			})
		})

	app.route('/*')
		.get( (req, res) => {
			res.sendFile(process.cwd()+ '/src/index.html');
		})
};