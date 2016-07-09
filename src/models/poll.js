var mongoose = require('mongoose');

var pollSchema = new mongoose.Schema({
		_id: String,
		title: String,
		choices: {type: Array, "default": [] }
	})

module.exports = mongoose.model('Poll', pollSchema);