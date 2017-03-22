/**/

'use strict';

angular.module('ptoApp')
    .controller('InfoController', ['$scope', function ($scope, $state) {

    }])
    .controller('ContainerController', ['$scope', '$state', function ($scope, $state) {
        $scope.$state = $state;
    }])

    .controller('LoginController', ['$scope', '$state', '$window', '$http', function ($scope, $state,$window, $http) {

        $scope.$state = $state;


        gapi.load('client:auth2', initClient);

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
            });
        }

        function updateSigninStatus(isSignedIn) {
            // When signin status changes, this function is called.
            // If the signin status is changed to signedIn, we make an API call.
            if (isSignedIn) {
                makeApiCall();
            }
        }

        $scope.handleSignInClick = function(event) {
            console.log(gapi.auth2.getAuthInstance().isSignedIn.get())
            // Ideally the button should only show up after gapi.client.init finishes, so that this
            // handler won't be called before OAuth is initialized.
            if(!gapi.auth2.getAuthInstance().isSignedIn.get()){
                gapi.auth2.getAuthInstance().signIn();
            }



        }

        $scope.handleSignOutClick = function(event) {
            console.log(gapi.auth2.getAuthInstance().isSignedIn.get())
            if(gapi.auth2.getAuthInstance().isSignedIn.get()){

                gapi.auth2.getAuthInstance().signOut();
            }
        }

        function makeApiCall() {
            // Make an API call to the People API, and print the user's given name.
            gapi.client.people.people.get({
                resourceName: 'people/me'
            }).then(function(response) {
                console.log('Hello, ' + response.result.names[0].givenName);
            }, function(reason) {
                console.log('Error: ' + reason.result.error.message);
            });
        }



        var url;
        var windowThatWasOpened;

        $http.get("url").then(function(response) {
            url = response.data;
        });

        $scope.login = function() {

            windowThatWasOpened = $window.open(url, "Please sign in with Google", "width=500px,height=700px");

        };

        window.onmessage = function(e) {
            if(windowThatWasOpened) windowThatWasOpened.close();
            var urlWithCode = e.data;

            var idx = urlWithCode.lastIndexOf("code=");
            if(idx === -1) return;
            var code = urlWithCode.substring(idx + 5).replace("#","");

            console.log('show myCode: '+code);

            $http.get("token?code=" + code).then(function(response) {
                console.log("im response: "+response.data.access_token);
                var userurl = 'https://www.googleapis.com/plus/v1/people/me?access_token='+response.data.access_token;
                $http.get(userurl).then(function(response) {
                    console.log("user info: "+JSON.stringify(response.data));
                })
            });


        } 
    }])

    .controller('BodyController', ['$scope', function ($scope, $state) {

        $scope.testData = {timeOffGroup:"paid time off", employeeName:"Todd Coulson", dateTime:"17 Mar 2017", endDateTime:"28 Mar 2017", startTime:"9:30a", endTime:"10:30a", message:"Vacation Paris", approverName:"awaiting approval", approverMessage:"Client meeting that day, we need you!"};

        $scope.testSetting = {cardType:'edit', timeType:'daily', timeStatus:'pending'};

    }])
    .controller('SecondBodyController', ['$scope', '$state', function ($scope, $state) {
        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;
        $scope.showDelete = false;
        $scope.showMenu = false;
        $scope.message = "Loading ...";

        $scope.testData = {timeOffGroup:"vacation", employeeName:"Todd Coulson", dateTime:"17 Mar 2017", endDateTime:"28 Mar 2017", startTime:"9:30a", endTime:"10:30a", message:"Vacation Paris", approverName:"awaiting approval", approverMessage:"Client meeting that day, we need you!"};

        $scope.testSetting = {cardType:'view', timeType:'daily', timeStatus:'pending'};
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

        $scope.updateDB = function(obj){
            
            timeTypeFactory.update(
                {timetypeid: obj.id}, {timeType: obj.entityValue}
            );
        };
        //employeeFactory.save({firstName: 'Joe', lastName: 'blow', employeeid: 'joe@blow.com', employeeType:"full-time"});
    }])
    .controller('TimeOffGroupAdminController', ['$scope', '$state', 'timeOffGroupFactory', function ($scope, $state, timeOffGroupFactory) {
        $scope.timeOffGroup = [];
        timeOffGroupFactory.query(
            function (response) {
                response.forEach(function(r, index){
                    $scope.timeOffGroup.push({id: r.timeoffgroupid, entityValue: r.timeOffGroup, entityColor: r.timeOffGroupColor, cardState:"view"});

                })
            },
            function (response) {
                console.log(response)
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

        $scope.updateDB = function(obj){
            timeOffGroupFactory.update(
                {timeoffgroupid: obj.id}, {timeOffGroup: obj.entityValue, timeOffGroupColor: obj.entityColor}
            );
        };
        $scope.testAdminSetting = {cardType:'view'};
        $scope.testAdminData = {entityValue:"Paid Time Off", colorValue:"#FFF"};
    }])
    .controller('UsersAdminController', ['$scope', '$state', function ($scope, $state) {
        console.log("users admin");
    }])
    .controller('HeaderController', ['$scope', '$state', '$rootScope', 'employeeFactory', function ($scope, $state, $rootScope, employeeFactory) {
        $scope.stateis = function(curstate) {
            return $state.is(curstate);  
        };
        $scope.stateincludes = function(curstate) {
            return $state.current.name.includes(curstate);  
        };


    }]);  