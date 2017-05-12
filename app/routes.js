var User = require("./models/user");
var express = require('express');
var app = express();
var path = require('path');
module.exports = function(app, passport){
    app.get('/', function(req, res){
    });

    app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

    app.get('/oauthcall', function(req, res){
        res.render("profile");
    });
    
    
}