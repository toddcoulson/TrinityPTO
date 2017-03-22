'use strict';
const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  if (typeof data.status !== 'string') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t create the todo item.'));
    return;
  }

  const params = {
    TableName: 'Request',
    Item: {
      requestid: uuid.v1(),
      requestedBy: data.requestedBy,
      approvedBy: data.approvedBy,
      status: data.status,
      startDateTime: data.startDateTime,
      endDateTime: data.endDateTime,
      duration: data.duration,
      message: data.message,
      approverMessage: data.approverMessage,
      locked: data.locked,
      timeState: data.timeState,
      timeStateColor: data.timeStateColor,
      timeOffGroup: data.timeOffGroup,
      timeOffGroupColor: data.timeOffGroupColor,
      dateCreated: timestamp,
      dateModified: timestamp
    },
  };

  // write the todo to the database
  dynamoDb.put(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t create the todo item.'));
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item),
      headers: {
        "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
      }
    };
    callback(null, response);
  });
};

module.exports.list = (event, context, callback) => {
  const params = {
    TableName: 'Request',
  };
  dynamoDb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t fetch the requests.'));
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items),
      headers: {
        "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
      }
    };
    callback(null, response);
  });
};

module.exports.delete = (event, context, callback) => {
  const params = {
    TableName: 'Request',
    Key: {
      requestid: event.pathParameters.requestid,
    },
  };

  // delete the todo from the database
  dynamoDb.delete(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t remove the todo item.'));
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify({}),
      headers: {
        "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
      }
    };
    callback(null, response);
  });
};

module.exports.get = (event, context, callback) => {
  const params = {
    TableName: 'Request',
    Key: {
      requestid: event.pathParameters.requestid,
    },
  };

  // fetch todo from the database
  dynamoDb.get(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t fetch the todo item.'));
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item),
      headers: {
        "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
      }
    };
    callback(null, response);
  });
};

module.exports.update = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  // validation
  if (typeof data.requestedBy !== 'string'  || typeof data.approvedBy !== 'string'  || typeof data.status !== 'string'  || typeof data.startDateTime !== 'string' ||  data.endDateTime !== 'string' ||  data.duration !== 'string' ||  data.message !== 'string' ||  data.approverMessage !== 'string' ||  data.locked !== 'string' ||  data.timeState !== 'string' ||  data.timeStateColor !== 'string' ||  data.timeOffGroup !== 'string' ||  data.timeOffGroupColor !== 'string' ) {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t update the todo item.'));
    return;
  }

  const params = {
    TableName: 'Request',
    Key: {
      requestid: event.pathParameters.requestid,
    },

    ExpressionAttributeValues: {
      ':requestedBy': data.requestedBy,
      ':approvedBy': data.approvedBy,
      ':status': data.status,
      ':startDateTime': data.startDateTime,
      ':endDateTime': data.endDateTime,
      ':duration': data.duration,
      ':message': data.message,
      ':approverMessage': data.approverMessage,
      ':locked': data.locked,
      ':timeState': data.timeState,
      ':timeStateColor': data.timeStateColor,
      ':timeOffGroup': data.timeOffGroup,
      ':timeOffGroupColor': data.timeOffGroupColor,
      ':dateModified': timestamp
    },
    UpdateExpression: 'SET requestedBy = :requestedBy, approvedBy = :approvedBy, status = :status, startDateTime = :startDateTime, endDateTime = :endDateTime, duration = :duration, message = :message, approverMessage = :approverMessage, locked = :locked, timeState = :timeState, timeStateColor = :timeStateColor, timeOffGroup = :timeOffGroup, timeOffGroupColor = :timeOffGroupColor',
    ReturnValues: 'ALL_NEW',
  };

  // update the todo in the database
  dynamoDb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t update the todo item.'));
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
      headers: {
        "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
      }
    };
    callback(null, response);
  });
};