var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	User = mongoose.model('User'),
	Stream = mongoose.model('Stream');
	
var CommentSchema = new Schema({
	comment: String,
	postedby: {
		type: Schema.Types.ObjectId,
		ref: 'User' 
	},
	stream: {
		type: Schema.Types.ObjectId,
		ref: 'Stream' 
	},
	updated: {type: Date, default: Date.now}
});

mongoose.model('Comment', CommentSchema);
