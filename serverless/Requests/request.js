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
      timeState: data.timeState,
      startDateTime: data.startDateTime,
      endDateTime: data.endDateTime,
      timeDuration: data.timeDuration,
      message: data.message,
      approverMessage: data.approverMessage,
      locked: data.locked,
      timeType: data.timeType,
      timeOffGroup: data.timeOffGroup,
      dateCreated: timestamp,
      dateModified: timestamp
    },
  };

  // write the todo to the database
  dynamoDb.put(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t create the request item.'));
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

module.exports.getEmployeeRequests = (event, context, callback) =>{
  var params = {
    TableName: 'Request',
    IndexName: 'EmployeeRequests',
    KeyConditionExpression: 'requestedBy = :requestedBy',
    ExpressionAttributeValues: { ':requestedBy': event.pathParameters.employeeid}
  }
  dynamoDb.query(params, function(err, result) {
    if (err) {
      console.log(err);
      callback(new Error('Couldn\'t get the requests for employees.'));
      return;
    } 
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

module.exports.getApproverRequests = (event, context, callback) =>{
  var params = {
    TableName: 'Request',
    IndexName: 'ApproverRequests',
    KeyConditionExpression: 'approvedBy = :approvedBy',
    ExpressionAttributeValues: { ':approvedBy': event.pathParameters.employeeid}
  }
  dynamoDb.query(params, function(err, result) {
    if (err) {
      console.log(err);
      callback(new Error('Couldn\'t get the requests for employees.'));
      return;
    } 
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
  dynamoDb.delete(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t remove the request item.'));
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
console.log(typeof data.requestedBy !== 'string'  , 
      typeof data.approvedBy !== 'string'  , 
      typeof data.timeState !== 'string'  , 
      typeof data.startDateTime !== 'string' ,  
      typeof data.endDateTime !== 'string' ,  
      typeof data.timeDuration ,  
      typeof data.message !== 'string' ,  
      typeof data.approverMessage !== 'string' ,  
      typeof data.locked !== 'string' ,  
      typeof data.timeOffGroup !== 'string')
  // validation
  if (typeof data.requestedBy !== 'string'  || 
      typeof data.approvedBy !== 'string'  || 
      typeof data.timeState !== 'string'  || 
      typeof data.startDateTime !== 'string' ||  
      typeof data.endDateTime !== 'string' ||  
      typeof data.timeDuration !== 'object' ||  
      typeof data.message !== 'string' ||  
      typeof data.approverMessage !== 'string' ||  
      typeof data.locked !== 'string' ||  
      //typeof data.timeType !== 'string' ||  
      typeof data.timeOffGroup !== 'string') {

    console.error('Validation Failed');
    callback(new Error('Couldn\'t update the request item.'));
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
      ':timeState': data.timeState,
      ':startDateTime': data.startDateTime,
      ':endDateTime': data.endDateTime,
      ':timeDuration': data.timeDuration,
      ':message': data.message,
      ':approverMessage': data.approverMessage,
      ':locked': data.locked,
      //':timeType': data.timeType,
      ':timeOffGroup': data.timeOffGroup,
      ':dateModified': timestamp
    },
            UpdateExpression: 'SET requestedBy = :requestedBy, approvedBy = :approvedBy, timeState = :timeState, startDateTime = :startDateTime, endDateTime = :endDateTime, timeDuration = :timeDuration, message = :message, approverMessage = :approverMessage, locked = :locked, timeOffGroup = :timeOffGroup, dateModified = :dateModified',


    ReturnValues: 'ALL_NEW',
  };

  // update the todo in the database
  dynamoDb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t update the request item.'));
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