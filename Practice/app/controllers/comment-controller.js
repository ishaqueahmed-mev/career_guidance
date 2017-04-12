var Stream = require('mongoose').model('Stream'),
	User = require('mongoose').model('User'),
	Comment = require('mongoose').model('Comment');
	
exports.create = function(req, res, next) {
	var comment = new Comment(req.body);
	var stream = new Stream(req.body);
	//res.json(req.user.id);
	// if(req.user.username) { 
		// res.json(req.user.username); 
	// }
	// else if(req.user.facebook.displayName) {
		// res.json(req.user.facebook.displayName);
	// }
	// else if(req.user.twitter.displayName) {
		// res.json(req.user.twitter.displayName);
	// }
	// else {
		// res.json(req.user.google.name);
	// }
	
	
	comment.postedby = req.user.id;
	comment.save(function(err) {
		if(!err) {
			Comment.find({})
				.populate('postedby stream')
				.exec(function(error, sub) {
					console.log(JSON.stringify(sub, null, "\t"));
					//res.json(sub);
				})
			res.json('success');
		}
		else {
			res.json('Error occured');
		}
	});
}