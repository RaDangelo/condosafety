var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	router.post('/user/login', passport.authenticate('login', {
		successMessage: 'Login executado com sucesso!',
		failureMessage: 'Falha no login!'
	}));

	router.post('/user/', passport.authenticate('signup', {
		successMessage: 'Usuário cadastrado com sucesso!',
		failureMessage: 'Falha cadastrar usuário!'
	}));

	// /* GET Home Page */
	// router.get('/home', isAuthenticated, function(req, res){
	// 	res.render('home', { user: req.user });
	// });

	// /* Handle Logout */
	// router.get('/signout', function(req, res) {
	// 	req.logout();
	// 	res.redirect('/');
	// });

    return router;

}
