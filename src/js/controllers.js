/**/

'use strict';

angular.module('ptoApp')
    .controller('InfoController', ['$scope', '$state','$rootScope', 'employeeTestFactory', function ($scope, $state, $rootScope, employeeTestFactory) {
        $scope.loggedIn = {};
        $rootScope.callInfo=function(){
            employeeTestFactory.get($rootScope.email).then(function(result) {
                $scope.loggedIn = result;
            });
        }


    }])
    .controller('ContainerController', ['$scope', '$rootScope', '$state','$window', 'employeeFactory', 'employeeTestFactory', function ($scope, $rootScope, $state, $window, employeeFactory, employeeTestFactory) {
        $scope.$state = $state;
        $window.initGapi = function() {
            console.log("gapi")
            gapi.load('client:auth2', initClient);
            $rootScope.gapi = gapi;
        }
        $scope.employeeType = $rootScope.email = "";
        function initClient() {
            // Initialize the client with API key and People API, and initialize OAuth with an
            // OAuth 2.0 client ID and scopes (space delimited string) to request access.
            gapi.client.init({
                apiKey: 'AIzaSyDaMf0eviuFygt1hzwQz03a2k2lrLDnpIc',
                discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
                clientId: '977491754644-954b83j2evmq65v6kchq4dsd9j0ud4vg.apps.googleusercontent.com',
                scope: 'profile'
            }).then(function () {
                // Listen for sign-in state changes.
                gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

                // Handle the initial sign-in state.
                updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
                $scope.employee = [];
            });
        }

        function updateSigninStatus(isSignedIn) {
            // When signin status changes, this function is called.
            // If the signin status is changed to signedIn, we make an API call.
            if (isSignedIn) {
                getEmailAddress();
            }

        }

        $scope.handleSignInClick = function(event) {
            // Ideally the button should only show up after gapi.client.init finishes, so that this
            // handler won't be called before OAuth is initialized.
            if(!gapi.auth2.getAuthInstance().isSignedIn.get()){
                gapi.auth2.getAuthInstance().signIn();
            }
        }

        $scope.handleSignOutClick = function(event) {
            if(gapi.auth2.getAuthInstance().isSignedIn.get()){

                gapi.auth2.getAuthInstance().signOut();
            }
        }

        function getEmailAddress() {
            // Make an API call to the People API, and print the user's given name.
            gapi.client.people.people.get({
                resourceName: 'people/me'
            }).then(function(response) {

                $rootScope.email = response.result.emailAddresses[0].value;
                $rootScope.callRequests();
                $rootScope.callInfo();
                employeeTestFactory.get($rootScope.email).then(function(message) {
                    console.log("This is a message!:!:!:!:"+message.firstName)
                });



                employeeFactory.get(
                    {employeeid: $rootScope.email},
                    function (response) {
                        $rootScope.employee = response;
                        $scope.employeeType = response.employeeType;
                        $scope.employee.push({employeeid: response.employeeid, employeeType: response.employeeType});

                    },
                    function (response) {
                        console.log(response)
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                    }
                );
            }, function(reason) {
                console.log('Error: ' + reason.result.error.message);
            });
        }


    }])

    .controller('LoginController', ['$scope', '$state', '$window', '$http','$rootScope', '$timeout', 'GooglePlus', 'gapiService', function ($scope, $state, $window, $http, $rootScope, $timeout, GooglePlus, gapiService) {


        $scope.$state = $state;
        $scope.callme = function(){
            $scope.handleSignInClick();
        }


        // if it could not be loaded, try the rest of
        // the options. if it was, return it.

        var url;
        var windowThatWasOpened;

        $http.get("url").then(function(response) {
            url = response.data;
        });

        $scope.login = function() {
            windowThatWasOpened = $window.open(url, "Please sign in with Google", "width=500px,height=700px");
        }


        window.onmessage = function(e) {

            if(windowThatWasOpened) windowThatWasOpened.close();
            var urlWithCode = e.data;

            var idx = urlWithCode.lastIndexOf("code=");
            if(idx === -1) return;
            var code = urlWithCode.substring(idx + 5).replace("#","");

            $http.get("token?code=" + code).then(function(response) {
                //console.log("im response: "+response.data.access_token);
                var userurl = 'https://www.googleapis.com/plus/v1/people/me?access_token='+response.data.access_token;
                $http.get(userurl).then(function(response) {
                    console.log("user info: "+JSON.stringify(response.data));
                })
            });


        } 
    }]) 

    .controller('RequestController', ['$scope', '$state', '$rootScope', 'requestFactory', 'employeeRequestFactory', 'timeOffGroupTestFactory', 'timeStateTestFactory', function ($scope, $state, $rootScope, requestFactory, employeeRequestFactory, timeOffGroupTestFactory, timeStateTestFactory) {
        $scope.requests = [];
        $scope.timeStates = [];
        $scope.timeOffGroups = [];

        /*employeeFactory.update(
                {employeeid: obj.id}, {timeType: obj.entityValue}
            );*/
        $rootScope.callRequests=function(){
            console.log("records!")
            timeOffGroupTestFactory.query().then(function(result) {
                $scope.timeOffGroups = result 
            }).then(function(result){
                timeStateTestFactory.query().then(function(result) {
                    console.log(result);
                    $scope.timeStates = result 
                })
            }).then(function(result){
                employeeRequestFactory.query(
                    {employeeid: $rootScope.email}, 
                    function (response) {
                        console.log("requests:"+response)
                        response.forEach(function(r, index){
                            var newValue = {requestid: r.requestid, requestedBy: r.requestedBy, approvedBy: r.approvedBy, status:r.status, startDateTime: r.startDateTime, endDateTime: r.endDateTime, duration: r.duration, message: r.message, approverMessage: r.approverMessage, locked: r.locked, timeState: r.timeState, timeOffGroup: r.timeOffGroup, cardState:"view"}
                            $scope.timeOffGroups.forEach(function(tog, index2){
                                if(r.timeOffGroup.toLowerCase() == tog.timeOffGroup.toLowerCase()){
                                    newValue.timeOffGroupColor = tog.timeOffGroupColor;
                                }
                            })
                            $scope.timeStates.forEach(function(ts, index3){
                                if(r.timeState.toLowerCase() == ts.timeState.toLowerCase()){
                                    newValue.timeStateColor = ts.timeStateColor;
                                }
                            })
                            $scope.requests.push(newValue);

                        })
                    },
                    function (response) {
                        console.log(response)
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                    }
                );
            }) 


        }

        $scope.addNew = function(){
            $scope.timeState.unshift({entityValue: "", entityColor: "#FFFFFF", cardState:"add"});
        }

        $scope.deleteDB = function(obj){
            timeStateFactory.delete(
                {timestateid: obj.id}
            );
        };

        $scope.addDB = function(obj){
            timeStateFactory.save(
                {}, {timeState: obj.entityValue, timeStateColor: obj.entityColor}
            );
        };

        $scope.updateDB = function(obj){
            timeStateFactory.update(
                {timestateid: obj.id}, {timeState: obj.entityValue, timeStateColor: obj.entityColor}
            );
        };

    }])
    .controller('SecondBodyController', ['$scope', '$state', function ($scope, $state) {
        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;
        $scope.showDelete = false;
        $scope.showMenu = false;
        $scope.message = "Loading ...";

        $scope.testData = {timeOffGroup:"vacation", firstName:"Todd", lastName:"Coulson", dateTime:"17 Mar 2017", endDateTime:"28 Mar 2017", startTime:"9:30a", endTime:"10:30a", message:"Vacation Paris", approverName:"awaiting approval", approverMessage:"Client meeting that day, we need you!",cardType:'view', timeType:'daily', timeState:'pending'};

        /*timeType: 'daily', //hourly, multiple, daily, editNew, edit
                timeState: 'pending'//approved, denied*/
    }])
    .controller('InfoApproverController', ['$scope', '$state', function ($scope, $state) {

    }])
    .controller('InfoAdminController', ['$scope', '$state', function ($scope, $state) {
        $scope.stateis = function(curstate) {
            return $state.is(curstate);  
        };
    }])
    .controller('BodyApproverController', ['$scope', '$state', function ($scope, $state) {
        $scope.testData = {timeType:"Multiple Days", timeStatus:"pending request", employeeName:"Todd Coulson", dateTime:"17 Mar 2017", endDateTime:"28 Mar 2017", startTime:"9:30a", endTime:"10:30a", message:"Vacation Paris", approverMessage:"Client meeting that day, we need you!"};
    }])
    .controller('BodyAdminController', ['$scope', '$state', function ($scope, $state) {
        $scope.testUserAdminData = {name: "Todd Coulson",
                                    employeeStartDate: "15-OCT-2016",
                                    carryoverHours: 0,
                                    allocatedHoursYear: 80,
                                    remainingHours:35
                                   }
        $scope.testUserAdminSetting = {cardType:'view'};


        $scope.testAdminSetting = {cardType:'view'};
    }])
    .controller('SecondBodyApproverController', ['$scope', '$state', function ($scope, $state) {

    }])
    .controller('TimeStateAdminController', ['$scope', '$state', 'timeStateFactory', function ($scope, $state, timeStateFactory) {
        $scope.timeState = [];
        timeStateFactory.query(
            function (response) {
                response.forEach(function(r, index){
                    $scope.timeState.push({id: r.timestateid, entityValue: r.timeState, entityColor: r.timeStateColor, cardState:"view"});

                })
            },
            function (response) {
                console.log(response)
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

        $scope.addNew = function(){
            $scope.timeState.unshift({entityValue: "", entityColor: "#FFFFFF", cardState:"add"});
        }

        $scope.deleteDB = function(obj){
            timeStateFactory.delete(
                {timestateid: obj.id}
            );
        };

        $scope.addDB = function(obj){
            timeStateFactory.save(
                {}, {timeState: obj.entityValue, timeStateColor: obj.entityColor}
            );
        };

        $scope.updateDB = function(obj){
            timeStateFactory.update(
                {timestateid: obj.id}, {timeState: obj.entityValue, timeStateColor: obj.entityColor}
            );
        };
    }])
    .controller('TimeTypeAdminController', ['$scope', '$state', 'timeTypeFactory', function ($scope, $state, timeTypeFactory) {
        $scope.timeType = [];
        timeTypeFactory.query(
            function (response) {
                response.forEach(function(r, index){
                    $scope.timeType.push({id: r.timetypeid, entityValue: r.timeType, entityColor: '#FFF', cardState:"view"});

                })
            },
            function (response) {
                console.log(response)
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

        $scope.addNew = function(){
            $scope.timeType.unshift({entityValue: "", entityColor: "#FFFFFF", cardState:"add"});
        }

        $scope.deleteDB = function(obj){
            timeTypeFactory.delete(
                {timetypeid: obj.id}
            );
        };

        $scope.updateDB = function(obj){

            timeTypeFactory.update(
                {timetypeid: obj.id}, {timeType: obj.entityValue}
            );
        };

        $scope.addDB = function(obj){

            timeTypeFactory.save(
                {}, {timeType: obj.entityValue}
            );
        };
        //employeeFactory.save({firstName: 'Joe', lastName: 'blow', employeeid: 'joe@blow.com', employeeType:"full-time"});
    }])
    .controller('TimeOffGroupAdminController', ['$scope','$rootScope', '$state', 'timeOffGroupTestFactory', 'timeOffGroupFactory', function ($scope, $rootScope, $state, timeOffGroupTestFactory, timeOffGroupFactory) {
        $scope.timeOffGroup = [];
        $rootScope.callRequests=function(){};
        $rootScope.callInfo=function(){};
        timeOffGroupTestFactory.query().then(function(result) {
            console.log(result);
            result.forEach(function(r, index){
                $scope.timeOffGroup.push({id: r.timeoffgroupid, entityValue: r.timeOffGroup, entityColor: r.timeOffGroupColor, cardState:"view"});

            })   
        });

        /*timeOffGroupFactory.query(
            function (response) {
                response.forEach(function(r, index){
                    $scope.timeOffGroup.push({id: r.timeoffgroupid, entityValue: r.timeOffGroup, entityColor: r.timeOffGroupColor, cardState:"view"});

                })
            },
            function (response) {
                console.log(response)
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );*/

        $scope.addNew = function(){
            $scope.timeOffGroup.unshift({entityValue: "", entityColor: "#FFFFFF", cardState:"add"});
        }

        $scope.deleteDB = function(obj){
            timeOffGroupFactory.delete(
                {timeoffgroupid: obj.id}
            );
        };

        $scope.updateDB = function(obj){
            timeOffGroupFactory.update(
                {timeoffgroupid: obj.id}, {timeOffGroup: obj.entityValue, timeOffGroupColor: obj.entityColor}
            );
        };

        $scope.addDB = function(obj){
            timeOffGroupFactory.save(
                {}, {timeOffGroup: obj.entityValue, timeOffGroupColor: obj.entityColor}
            );
        };
    }])
    .controller('UsersAdminController', ['$scope', '$state', 'employeeFactory', 'employeeTestFactory', function ($scope, $state, employeeFactory, employeeTestFactory) {
        $scope.employees = [];



        employeeFactory.query(
            function (response) {
                response.forEach(function(r, index){
                    $scope.employees.push({cardState:"view",employeeid: r.employeeid, firstName: r.firstName, lastName:r.lastName, totalTimeAccrued: r.totalTimeAccrued, totalTimeUsed: r.totalTimeUsed});

                })
            },
            function (response) {
                console.log(response)
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

        $scope.addNew = function(){
            $scope.employees.unshift({cardState:"add",employeeid: "", firstName: "", lastName:"", totalTimeAccrued: 0, totalTimeUsed: 0});
        }

        $scope.deleteDB = function(obj){
            $scope.employees.forEach(function(elem, index){
                if(elem.employeeid == obj) $scope.employees.splice(index, 1);
            })
            employeeFactory.delete(
                {employeeid: obj}
            );
        };

        $scope.updateDB = function(obj){

            employeeFactory.update(
                {employeeid: obj.id}, {timeType: obj.entityValue}
            );
        };
    }])
    .controller('HeaderController', ['$scope', '$state', '$rootScope', 'employeeFactory', function ($scope, $state, $rootScope, employeeFactory) {
        //$scope.signin = $rootScope.gapi.auth2.getAuthInstance().isSignedIn.get();
        $scope.stateis = function(curstate) {
            return $state.is(curstate);  
        };
        $scope.stateincludes = function(curstate) {
            return $state.current.name.includes(curstate);  
        };


    }]);  