var express = require('express'),
	router = express.Router(),
	User = require('../models/user.vo'),
	Watch = require('../models/watch-control.vo'),
	daoWatch = require('../daos/watch-control.dao');
require('promise');


var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function (passport) {

	router.post('/user/login', function (req, res, next) {
		passport.authenticate('login', function (err, user, info) {
			if (err) {
				return next(err);
			}
			if (!user) {
				var err = new Error(info.message);
				err.status = 401;
				return next(err);
			}
			var watch = new Watch();
			watch.user = user;
			watch.date = new Date();
			watch.action = 0;
			daoWatch.saveWatch(watch).then(data => res.json(user)).catch(err => next(err));
		})(req, res, next)
	});


	router.post('/user/', function (req, res, next) {
		passport.authenticate('signup', function (err, user, info) {
			if (err) {
				return next(err);
			}
			if (!user) {
				var err = new Error(info.message);
				err.status = 500;
				return next(err);
			}
			res.json({ status: 200 });
		})(req, res, next)
	});

	router.get('/user', function (req, res) {
		User.find(function (err, users) {
			if (err)
				res.send(err)
			res.json(users);
		});
	});

	router.post('/user/delete', function (req, res) {
		User.remove({
			_id: req.body._id
		}, function (err, user) {
			if (err)
				res.send(err);

			User.find(function (err, user) {
				if (err)
					res.send(err)
				res.json(user);
			});
		});
	});

	return router;

}
