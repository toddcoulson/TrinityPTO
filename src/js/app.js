angular.module('ptoApp', ['ui.router','ngResource', 'ui.bootstrap', 'colorpicker.module'])
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
                    templateUrl : './views/body.html',
                    controller  : 'BodyController'
                },
                'secondBody@': {
                    templateUrl : './views/secondBody.html',
                    controller  : 'SecondBodyController'
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
                    controller  : 'BodyAdminController'
                },
                'secondBody@': {
                    templateUrl : './views/secondBodyAdmin.html',
                    controller: 'UsersAdminController'
                }
            }
        })
        
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

