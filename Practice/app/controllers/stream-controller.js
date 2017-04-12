var Stream = require('mongoose').model('Stream');
var SubStream = require('mongoose').model('SubStream');
var Comment = require('mongoose').model('Comment');
	
		// Server side
			// exports.read = function(req, res) {
				// var stream = new Stream(req.body);
				// Stream.find({}, function(err, user) {
					// res.render('stream/stream-edit', {
				// docs: req.stream
				// });
			 // //res.json(users);
				// });
			// };
			
			// this one
			// exports.read = function(req, res) {
				// var stream = new Stream(req.body);
				// Stream.find({_id: req.stream.id}, function(err, user) {
					// Comment.find({stream: req.stream.id}, function(err, data) {
						// res.render('stream/stream-edit', {
							// data: data,
							// docs: req.stream

							// //res.json(data);
						// });
					// });
				// });
			 // //res.json(users);
			// };
			
	
	// Client side
	exports.read = function(req, res) {
		var stream = new Stream(req.body);
		Stream.find({}, function(err, users) {
			res.json(req.stream);
		});
	};
	
	exports.streamById = function(req, res, next, id) {
		var stream = new Stream(req.body);
			Stream.findOne({
				_id: id
			}, function(err, stream) {
				if(!err) {
					req.stream = stream;
					next();
				}
		});
	};
	
	exports.create = function(req, res, next) {
		Stream.find({}, function(err, docs) {
			res.render('substream/create-substream',{
				title: 'Substream page',
				docs: docs
			});
		});
	};
	
	exports.show = function(req, res, next) {
			var stream = new Stream(req.body);
			Stream.find({_id: req.stream.id}, function(cate) {
				SubStream.find({streamList: req.stream.id}, function(err, data) {
				res.json(data);
					// res.render('showList', {
						// title: 'Show Substreams',
						// docs: data
					//});
			});
		});
	}
	
	// exports.showComment = function(req, res, next) {
		// var stream = new Stream(req.body);
		// Stream.find({_id: req.stream.id}, function(cate) {
			// Comment.find({stream: req.stream.id}, function(err, data) {
				// res.json(data);
			// })
		// });
	// }
	
	// exports.showComment = function(req, res, next) {
	// var stream = new Stream(req.body);
	// Stream.find({_id: req.stream.id}, function() {
		// Comment.find({stream: req.stream.id})
			// .lean()
			// .populate( {path: 'postedby'} )
			// .exec( function(err, docs) {
					// var options = {
						// // path: 'username',
						// path: 'facebook.displayName',
						// model: 'User'
					// };
			// if(err) return res.json(500);
			// Comment.populate(docs, options, function(err, posts) {		
				// res.json(posts);
				
			 // // res.render('subcategory/subcategory-list', {
			 // // title: 'Subcategories lists',
			 // // "users": posts,
			 // // });		
			// });
		// });
	// });
	// }
	
	exports.showComment = function(req, res, next) {
	var stream = new Stream(req.body);
	Stream.find({_id: req.stream.id}, function() {
		Comment.find({stream: req.stream.id})
			.lean()
			.populate( {path: 'postedby'} )
			.exec( function(err, docs) {
			    var options = {
					path: 'username',
					model: 'User'
				};
			if(err) return res.json(500);
			Comment.populate(docs, options, function(err, posts) {		
				res.json(posts);
				
			 // res.render('subcategory/subcategory-list', {
			 // title: 'Subcategories lists',
			 // "users": posts,
			 // });		
			});
		});
	});
	}
	
	


