'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  if (typeof data.employeeid !== 'string') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t create the employee item.'));
    return;
  }

  const params = {
    TableName: 'Employee',
    Item: {
      employeeid: data.employeeid,
      firstName: data.firstName,
      lastName: data.lastName,
      employeeType: data.employeeType,
      requests: data.requests,
      totalTimeUsed: data.totalTimeUsed,
      totalTimeAccrued: data.totalTimeAccrued,
      dateCreated: timestamp,
      dateModified: timestamp
    },
  };

  // write the employee to the database
  dynamoDb.put(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t create the employee item.'));
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
      TableName: 'Employee',
    };
  dynamoDb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t fetch the employees.'));
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
    TableName: 'Employee',
    Key: {
      employeeid: event.pathParameters.employeeid,
    },
  };

  // delete the todo from the database
  dynamoDb.delete(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t remove the employee item.'));
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
    TableName: 'Employee',
    Key: {
      employeeid: event.pathParameters.employeeid,
    },
  };

  // fetch todo from the database
  dynamoDb.get(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t fetch the employee item.'));
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
  console.log(typeof data.employeeid !== 'string' , typeof data.firstName !== 'string'  , typeof data.lastName !== 'string' ,typeof data.totalTimeUsed !== 'number'  , typeof data.totalTimeAccrued !== 'number' );
  // validation
  if (typeof data.employeeid !== 'string' || typeof data.firstName !== 'string'  || typeof data.lastName !== 'string'  || typeof data.totalTimeUsed !== 'number'  || typeof data.totalTimeAccrued !== 'number' ) {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t update the todo item.'));
    return;
  }

  const params = {
    TableName: 'Employee',
    Key: {
      employeeid: event.pathParameters.employeeid,
    },
    
    ExpressionAttributeValues: {
      ':firstName': data.firstName,
      ':lastName': data.lastName,
      ':employeeType': data.employeeType,
      ':totalTimeUsed': data.totalTimeUsed,
      ':totalTimeAccrued': data.totalTimeAccrued,
      ':dateModified': timestamp
    },
    UpdateExpression: 'SET firstName = :firstName, lastName = :lastName, employeeType = :employeeType, totalTimeUsed = :totalTimeUsed, totalTimeAccrued = :totalTimeAccrued, dateModified = :dateModified',
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