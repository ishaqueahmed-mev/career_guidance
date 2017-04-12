var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var StreamSchema = mongoose.Schema({
	title: String,
	description: String,
	section1: String,
	section2: String,
	redirect: String,
	path: {
		type: String,
		required: true,
		trim: true
	},
	originalname: {
		type: String,
		required: true
	},
	 updated: { 
		type: Date,
		default: Date.now 
	}
});

mongoose.model('Stream', StreamSchema);