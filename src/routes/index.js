'use strict'

var mongoose = require('mongoose');
var Poll = require('../models/poll');

module.exports = function(app) {
	app.route('/')
		.get( (req, res) => {
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

			let poll = new Poll({
				_id: req.body._id,
				title: req.body.title,
				choices: req.body.choices
			});

			poll.save((err) => {
				if(err) return console.error(err);
				res.send({message: req.body.name + "'s poll has been added sucessfully!"});
			})

		})
		
	app.route('/api/allpolls/:pollId')
		.post( (req,res) => {
			let updateChoice = "choices.$." + req.body.choice;

			Poll.findOneAndUpdate(
				{"_id": req.params.pollId, "choices.choice_name": req.body.choice},
				{$inc: {"choices.$.votes": 1}},
				{upsert: true}, function(err, poll) {
					if(err) return console.error(err);
					res.send(poll);
				})

		})
		.delete( (req,res) => {
			Poll.find({
				_id: req.params.pollId
			}).remove(() => {
				res.send({message: req.params.pollId + "'s poll has been removed sucessfully!"});
			})
		})

	app.route('/*')
		.get( (req, res) => {
			res.sendFile(process.cwd()+ '/src/index.html');
		})
};