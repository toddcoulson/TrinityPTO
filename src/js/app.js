angular.module('ptoApp', ['ptoApp.services', 'ptoApp.controller', 'ptoApp.employeeTestFactory', 'ui.router','ngResource', 'ui.bootstrap', 'colorpicker.module', 'googleplus'])
    .config(['GooglePlusProvider', function(GooglePlusProvider) {
        GooglePlusProvider.init({
            clientId: '977491754644-954b83j2evmq65v6kchq4dsd9j0ud4vg.apps.googleusercontent.com',
            apiKey: 'AIzaSyDaMf0eviuFygt1hzwQz03a2k2lrLDnpIc'
        });
    }])
    .service('gapiService', function() {
    this.initGapi = function(postInitiation) {
        gapi.client.load('helloWorld', 'v1', postInitiation, restURL);
    }
})
    .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
        $stateProvider

        // route for the home page
            .state('app', {
            url:'/',
            views: {
                'header': {
                    templateUrl : './views/header.html',
                    controller  : 'HeaderController'
                },
                'info': {
                    templateUrl : './views/login.html',
                    controller  : 'LoginController'
                },
                'body': {
                    templateUrl : './views/loginBody.html',
                    controller  : ''
                },
                'secondBody': {
                    templateUrl : './views/loginSecondBody.html',
                    controller  : ''
                }
            }

        })
            .state('app.employee', {
            url:'employee',
            views: {
                'info@': {
                    templateUrl : './views/info.html',
                    controller  : 'InfoController'
                },
                'body@': {
                    templateUrl : './views/request.html',
                    controller  : 'RequestController'
                },
                'secondBody@': {
                    templateUrl : './views/secondRequest.html',
                    controller  : 'SecondRequestController'
                }
            }

        })

        // route for the menu page
            .state('app.approver', {
            url: 'approver',
            views: {
                'info@': {
                    templateUrl : './views/infoApprover.html',
                    controller  : 'InfoApproverController'
                },
                'body@': {
                    templateUrl : './views/bodyApprover.html',
                    controller  : 'BodyApproverController'
                },
                'secondBody@': {
                    templateUrl : './views/secondBodyApprover.html',
                    controller: 'SecondBodyApproverController'
                }
            }
        })

            .state('app.admin', {
            url: 'admin',
            views: {
                'info@': {
                    templateUrl : './views/infoAdmin.html',
                    controller  : 'InfoAdminController'
                },
                'body@': {
                    templateUrl : './views/bodyAdmin.html',
                    controller  : 'UsersAdminController'
                },
                'secondBody@': {
                    templateUrl : './views/secondBodyAdmin.html',
                    controller: ''
                }
            }
        })
/*
            .state('app.adminTimeType', {
            url: 'admin/timeType',
            views: {
                'info@': {
                    templateUrl : './views/infoAdmin.html',
                    controller  : 'InfoAdminController'
                },
                'body@': {
                    templateUrl : './views/body_time_type.html',
                    controller  : 'TimeTypeAdminController'
                },
                'secondBody@': {
                    templateUrl : './views/secondBodyAdmin.html',
                    controller: 'BodyAdminController'
                }
            }
        })
*/
            .state('app.adminTimeState', {
            url: 'admin/timestate',
            views: {
                'info@': {
                    templateUrl : './views/infoAdmin.html',
                    controller  : 'InfoAdminController'
                },
                'body@': {
                    templateUrl : './views/body_time_state.html',
                    controller  : 'TimeStateAdminController'
                },
                'secondBody@': {
                    templateUrl : './views/secondBodyAdmin.html',
                    controller: 'BodyAdminController'
                }
            }
        })

            .state('app.adminTimeOffGroup', {
            url: 'admin/timeOffGroup',
            views: {
                'info@': {
                    templateUrl : './views/infoAdmin.html',
                    controller  : 'InfoAdminController'
                },
                'body@': {
                    templateUrl : './views/body_time_off_group.html',
                    controller  : 'TimeOffGroupAdminController'
                },
                'secondBody@': {
                    templateUrl : './views/secondBodyAdmin.html',
                    controller: 'TimeOffGroupAdminController'
                }
            }
        });

        $urlRouterProvider.otherwise('/');
    }]);

angular.module('ptoApp.services', []);
angular.module('ptoApp.controller', []);
angular.module('ptoApp.employeeTestFactory', []);
