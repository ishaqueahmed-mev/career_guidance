var config = require('./config');
	mongoose = require('mongoose');
	
module.exports = function() {
	mongoose.Promise = global.Promise;
	var db = mongoose.connect(config.db);
	
	require('../app/models/user-model');
	require('../app/models/stream-model');
	require('../app/models/substream-model');
	require('../app/models/comment-model');
	
	return db;
};