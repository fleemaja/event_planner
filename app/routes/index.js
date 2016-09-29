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
        });
        
    app.route('/new')
        .get(isLoggedIn, function(req, res) {
            var user;
            if (req.user) {
                user = req.user.name;
            }
        	  res.render(path + '/public/html/newEvent.ejs', { user: user });
        })
        .post(isLoggedIn, function(req, res) {
            eventController.create(req, res);
        });
        
    app.route('/signup')
      .get(function(req, res) {
      	res.render(path + '/public/html/signup.ejs', { message: req.flash('signupMessage') });
      })
      .post(passport.authenticate('local-signup', 
              { successRedirect: '/',
                failureRedirect: '/signup',
                failureFlash: true
              }));
              
    app.route('/login')
      .get(function(req, res) {
      	res.render(path + '/public/html/login.ejs', { message: req.flash('loginMessage') });
      })
      .post(passport.authenticate('local-login', 
              { successRedirect: '/',
                failureRedirect: '/login',
                failureFlash : true // allow flash messages
              }));

  	app.route('/logout')
  		.get(function (req, res) {
  			req.logout();
  			res.redirect('/');
  		});
}
