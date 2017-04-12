#!/usr/bin/env node
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// var debug = require('debug')('passport-mongo');
var	express = require('./config/express'),
	config = require('./config/config'),
    mongoose = require('./config/mongoose');

var db = mongoose(),
	app = express();

app.listen(config.port);

module.exports = app;
console.log(process.env.NODE_ENV + ' server running at http://localhost:' + config.port);

// var server = app.listen(app.get('port'), function() {
  // console.log('Express server listening on port ' + server.address().port);
// });
