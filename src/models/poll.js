var mongoose = require('mongoose');

var pollSchema = new mongoose.Schema({
		_id: String,
		creator: String,
		title: String,
		choices: {type: Array, "default": [] },
		voted_users: [String],
		total_votes: Number
	})

module.exports = mongoose.model('Poll', pollSchema);