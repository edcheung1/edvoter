var mongoose = require('mongoose');

var pollSchema = new mongoose.Schema({
		id: Number,
		name: String,
		value: Number
	})

module.exports = mongoose.model('Poll', pollSchema);