'use strict';
var AWS = require('aws-sdk');
var dynamo = new AWS.DynamoDB.DocumentClient();
module.exports.createMovie = (event, context, cb) => {  
  const params = {
    TableName: 'moviesTwo',
    Item: {
        "movieTitle": "Star Wars"
    }
  };

  return dynamo.put(params, cb);
};