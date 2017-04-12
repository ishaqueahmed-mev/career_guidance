module.exports = function(app, passport) {
	app.get('/oauth/facebook', passport.authenticate('facebook', { scope : 'email' }));
	
    app.get('/oauth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/#/sample',
            failureRedirect : '/'
    }));
	
	app.get('/oauth/twitter', passport.authenticate('twitter'));

    app.get('/oauth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect : '/#/sample',
            failureRedirect : '/'
    }));
	
	app.get('/oauth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    app.get('/oauth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/#/sample',
                    failureRedirect : '/'
    }));

}