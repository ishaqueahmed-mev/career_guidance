var Stream = require('mongoose').model('Stream');	
var streamCtrl = require('../controllers/stream-controller');
var substreamCtrl = require('../controllers/substream-controller');

var express = require('express'),
	app = express(),
	multer = require('multer'),
	path = require('path'),
	fs = require('fs'),
	multipart = require('connect-multiparty');

	app.use( multipart() );
	
var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './public/images/')
	},
	filename: function(req, file, cb) {
		cb(null, file.originalname);
	}
});
 
var upload = multer({
	storage: storage
});


module.exports = function(app) {
	
	app.get('/stream', function(req, res) {
		res.render('stream/create-stream');
	});
	
	
	app.get('/admin', function(req, res) {
		res.render('admin');
	});
	
	
	app.post('/stream/create', upload.any(), function(req, res, next) {
		//res.send(req.files);
		
		var stream = new Stream(req.body);
		
		var path = req.files[0].path;
		var imageName = req.files[0].originalname;
		var imagepath = {};
		imagepath['path'] = path;
		imagepath['originalname'] = imageName;
 
		stream.path = path;
		stream.originalname = imageName;

		stream.save(function(err) {
			if(err) {
				res.json('Something went wrong');
			}
			else {
				res.json('Images created');
			}
		});
	});
	
	//For server side
	app.get('/stream/details', function(req, res) {
		//var image = new Image(req.body);
		Stream.find({}, function(err, docs) {
			res.render('stream/stream-list', {
				title: 'Images list',
				docs: docs
			});
		});
	});
	
	// For Client side
	app.get('/stream/list', function(req, res) {
		Stream.find({}, function(err, users) {
			if(!err) {
				res.json(users);
			}
		});
	});
	
	app.route('/stream/:streamId').get(streamCtrl.read);
	
	app.param('streamId', streamCtrl.streamById);
	
	app.get('/substream/create', streamCtrl.create);
	
	app.route('/stream-list/:streamId').get(streamCtrl.show);
	
	app.route('/comment/:streamId').get(streamCtrl.showComment);
	
};