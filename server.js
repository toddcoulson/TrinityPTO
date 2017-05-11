var express = require('express');
var app = express();
var path = require('path');

var port = process.env.PORT || 8081;
var cookieParser = require("cookie-parser");
var session = require('express-session');
var morgan = require("morgan");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var passport = require("passport");
var flash = require("connect-flash");

/*var configDB = require('./config/database.js');*/

//var dynamodbLocal = require("dynamodb-localhost");
//dynamodbLocal.install(); /* This is one time operation. Safe to execute multiple times which installs DynamoDB once. All the other methods depends on this. */
/*dynamodbLocal.start({port: 8080});

var AWS = require('aws-sdk');
var config = {"endpoint":"http://localhost:8080"};
var client = new AWS.DynamoDB(config);
var s3client = new AWS.S3(config);
*/
app.use(express.static('static'));
var google = require('googleapis');
var plus = google.plus('v1');
var OAuth2 = google.auth.OAuth2;

var oauth2Client = new OAuth2(
  "977491754644-954b83j2evmq65v6kchq4dsd9j0ud4vg.apps.googleusercontent.com",
  "1HG0kBMDFm8PiLIVpa_6gI58",
  "http://localhost:9000/oauthcall"
);

// generate a url that asks permissions for Google+ and Google Calendar scopes
var scopes = [
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/calendar'
];

var url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',

  // If you only need one scope you can pass it as a string
  scope: scopes,

  // Optional property that passes state parameters to redirect URI
  // state: { foo: 'bar' }
});

app.get("/url", function(req, res){
  res.send(url);
});
app.get("/token", function(req, res){

  var code = req.query.code;

  console.log(code);

  oauth2Client.getToken(code, function(err, tokens) {
    if (err) {
      console.log(err);
      res.send(err);
      return;
    }

    console.log("allright!!!!");

    console.log(err);
    console.log(tokens);
    oauth2Client.setCredentials(tokens);
    res.send(tokens);
  });
/*
  plus.people.get({
    key: "AIzaSyDaMf0eviuFygt1hzwQz03a2k2lrLDnpIc",
    userId: '+google'
  }, function (err, user) {
    console.log('Result: ' + (err ? err.message : user.displayName));
  });*/

  
});


app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('./config/auth',  express.static(__dirname + './config/auth'));
app.use('/app',  express.static(__dirname + '/app'));
app.set('views', __dirname + '/dist/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

require('./config/passport')(passport);
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({secret: 'anystringoftext',
                 saveUninitialized: true,
                 resave: true}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(express.static(__dirname + '/dist')); 

//app.use(express.static(path.join(__dirname, '/*')));
require('./app/routes.js')(app, passport);

app.listen(port);
console.log('server running on port:'+port);
