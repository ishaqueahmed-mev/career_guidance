var SubStream = require('mongoose').model('SubStream'),
	Stream = require('mongoose').model('Stream');

exports.create = function(req, res) {
	var substream = new SubStream(req.body);
	substream.save(function(err) {
		if(!err) {
			SubStream.find({})
				.populate('streamList')
				.exec(function(error, substr) {
					console.log(JSON.stringify(substr, null, "\t"));
					res.json(substr);
				});
		}
	});
};