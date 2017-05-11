Trinity IT PTO
=========

A project created to let employees at Trinity know how much PTO they have used. Let Approvers approve and deny time. Let Admins control users and track progress. 

## Installation
  
  git clone https://toddcoulson@bitbucket.org/trinityit/time-off-request.git
  npm install
  bower install
  npm run watch:all
  This last call unfortunately works best on mac. I read up on npm and their scripts are not cross platform. 

## Usage

  The project is split into 3 parts. Employee, Approvers and Admin. Employees can create requests and view all past requests. Approvers can approve or deny requests. And Admin users can change pieces of the project like colors of time off groups, or time state. In order to get a fresh project working, the rest api needs an employee created with a status of admin, and the same google id as their email address. Every employee must have a user created with their google email address attached as an employeeid. Once that is set in place, the google authentication will work and the user can use the PTO project. 


## Tests

  Karma Tests
  karma start
  
  E2E Tests
  protractor conf.js

## Google Application

The PTO project requires Google authentication for the signin. In order to change settings, the sign in is with todd.coulson@trinityit.biz account. Feel free to change this:
https://developers.google.com/+/web/api/rest/oauth
https://developers.google.com/+/web/signin/
Great video outlining creating the app:
https://egghead.io/lessons/javascript-add-a-google-oauth-2-0-login-button-to-your-site
I am handling most of the login details in the controller.js file. 

## Serverless framework

To make maintenance of the REST API easier I have created the API Gateway using serverless framework:
https://serverless.com/

First to get your AWS account setup with the proper credentials you need to follow these instructions:
https://serverless.com/framework/docs/providers/aws/guide/credentials/

The folder in serverless marked policies were worked on with Wes to allow for the minimal settings needed to run 
serverless deploy
on the folder of your choice to get the dynamodb, lambda functions, and gateway api created for the data model of your choice. After running serverless deploy you can see all of these elements created in your aws account. 

## src/js/services.js 

It should also be noted that most of the api calls are being made inside this file. Some are also being made in employeeFactory.js and requestFactory.js. You can change the calls to the rest api created with serverless framework here. 