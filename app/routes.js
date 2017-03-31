var User = require("./models/user");
var express = require('express');
var app = express();
var path = require('path');
module.exports = function(app, passport){
    app.get('/', function(req, res){
    });

    
    app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

	//app.get('/auth/google/callback', 
	  //passport.authenticate('google', { successRedirect: '/profile',
	                                     // failureRedirect: '/' }));
    
    
    /*app.get('/auth/google', function(req, res, next) {
        if (!req.user) { 
            return next();
        }
        res.redirect('/profile'); 
    },
        passport.authenticate('google', {scope:['profile', 'email']}));

    app.get('/auth/google/callback', passport.authenticate('google', {successRedirect: '/profile', failureRedirect: '/'}));*/

    app.get('/oauthcall', function(req, res){
        res.render("profile");
    });
    
    
}