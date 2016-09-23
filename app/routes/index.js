'use strict';

var path = process.cwd();
var eventController = require(path + '/app/controllers/eventController.js');

module.exports = function (app, passport) {
    function isLoggedIn(req, res, next) {
  		if (req.isAuthenticated()) {
  			return next();
  		} else {
  			return res.redirect('/');
  		}
  	}
	
    app.route('/')
        .get(function(req, res) {
        	  eventController.index(req, res);
        })
        .post(isLoggedIn, function(req, res) {
            eventController.create(req, res);
        });
        
    app.route('/signup')
      .post(passport.authenticate('local-signup', 
              { successRedirect: '/',
                failureRedirect: '/'
              }));
              
    app.route('/login')
      .post(passport.authenticate('local-login', 
              { successRedirect: '/',
                failureRedirect: '/'
              }));

  	app.route('/logout')
  		.get(function (req, res) {
  			req.logout();
  			res.redirect('/');
  		});
}
