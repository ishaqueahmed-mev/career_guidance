var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user-model.js');

router.get('/user/list', function(req, res) {
	User.find({}, function(err, result) {
		res.json(result)
	});
});

router.post('/register', function(req, res) {
  User.register(new User({ username: req.body.username }),
    req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({
        err: err
      });
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({
        status: 'Registration successful!'
      });
    });
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      res.status(200).json({
        status: 'Login successful!'
      });
    });
  })(req, res, next);
});

	router.get('/oauth/facebook', passport.authenticate('facebook', { scope : 'email' }));
	
	
    router.get('/oauth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/#!/sample',
            failureRedirect : '/'
   }));
	
	router.get('/oauth/twitter', passport.authenticate('twitter'));

    router.get('/oauth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect : '/#!/sample',
            failureRedirect : '/'
    }));
	
	router.get('/oauth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    router.get('/oauth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/#!/sample',
                    failureRedirect : '/'
    }));

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

router.get('/status', function(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }
  res.status(200).json({
    status: true
  });
});

module.exports = router;