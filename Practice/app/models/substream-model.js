var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Stream = mongoose.model('Stream');
	
var SubStreamSchema = new Schema({
	title: String,
	description: String,
	streamList: {
		type: Schema.Types.ObjectId, ref: 'Stream'
	}
});

mongoose.model('SubStream', SubStreamSchema);