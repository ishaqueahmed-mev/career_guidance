// dependencies
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var morgan       = require('morgan');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var hash = require('bcrypt-nodejs');
var path = require('path');
var passport = require('passport');
var flash = require('connect-flash');
var localStrategy = require('passport-local' ).Strategy;
FacebookStrategy= require('passport-facebook' ).Strategy;
var session      = require('express-session');
var angularBridge = require('angular-bridge');
var multer = require('multer');
var upload = multer({ dest: '/uploads' });


// mongoose
// mongoose.connect('mongodb://localhost/mean-auth');

// user schema/model
module.exports = function() {
var User = require('../app/models/user-model.js');

// create instance of express
var app = express();



require('../config/passport')(passport); // pass passport for configuration

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)


// define middleware
app.use(express.static(path.join(__dirname, '../public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', './app/views')
app.set('view engine', 'jade');

app.use(session ({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//app.use(express.static(path.join(__dirname, 'public')));

// configure passport
passport.use(new localStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


// require routes

var routes = require('../app/routes/routes.js');
// routes
app.use('/', routes);

app.get('/', function(req, res) {
   res.sendFile(path.join(__dirname, '../public/views', 'layout.html'));
});

// error handlers
// app.use(function(req, res, next) {
  // var err = new Error('Not Found');
  // err.status = 404;
  // next(err);
// });

// app.use(function(err, req, res) {
  // res.status(err.status || 500);
  // res.end(JSON.stringify({
    // message: err.message,
    // error: {}
  // }));
// });

//app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, '')));

//require('../app/routes/stream-route')(app);
require('../app/routes/stream-route')(app);
require('../app/routes/substream-route')(app);
require('../app/routes/comment-route')(app);

app.use(express.static('./'));
app.use(express.static('./public'));

return app;

};
//module.exports = app;
