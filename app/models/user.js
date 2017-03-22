var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var userSchema = mongoose.Schema({
   local:{
       username: String,
       password: String
   },
    google:{
        id:String,
        token:String,
        email:String,
        name:String
    }
});
module.exports = mongoose.model('User', userSchema);