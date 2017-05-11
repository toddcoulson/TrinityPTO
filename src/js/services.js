(function () {

    'use strict';
    //https://1919b06afk.execute-api.us-east-1.amazonaws.com/dev/request
    //https://ah8jxcqn7i.execute-api.us-east-1.amazonaws.com/dev/timeoffgroup
    //https://xspyiflx34.execute-api.us-east-1.amazonaws.com/dev/employeetype
    //https://n6l0eglcu8.execute-api.us-east-1.amazonaws.com/dev/employee
    //https://zd0tb3j230.execute-api.us-east-1.amazonaws.com/dev/timestate

    
    
    angular.module('ptoApp.services')
    //Todd's Version
    //******* 
        .constant("baseURLEmployee", "https://tbgspm8rvi.execute-api.us-east-1.amazonaws.com/dev/")
        .constant("baseURLEmployeeType", "https://313eil8vh4.execute-api.us-east-1.amazonaws.com/dev/")
        .constant("baseURLRequest", "https://wou53nmy62.execute-api.us-east-1.amazonaws.com/dev/")
        .constant("baseURLTimeOffGroup", "https://pwqlomgq89.execute-api.us-east-1.amazonaws.com/dev/")
    //.constant("baseURLTimeType", "https://jq2npw66ai.execute-api.us-east-1.amazonaws.com/dev/")
        .constant("baseURLTimeState", "https://hmmoye191c.execute-api.us-east-1.amazonaws.com/dev/")
//*********/
    //Trinity IT AWS constants
        /* 
        .constant("baseURLEmployee", "https://n6l0eglcu8.execute-api.us-east-1.amazonaws.com/dev/")
        .constant("baseURLEmployeeType", "https://xspyiflx34.execute-api.us-east-1.amazonaws.com/dev/employeetype")
        .constant("baseURLRequest", "https://1919b06afk.execute-api.us-east-1.amazonaws.com/dev/")
        .constant("baseURLTimeOffGroup", "https://ah8jxcqn7i.execute-api.us-east-1.amazonaws.com/dev/timeoffgroup")
        .constant("baseURLTimeState", "https://zd0tb3j230.execute-api.us-east-1.amazonaws.com/dev/")
        //*/
        .factory('employeeFactory', ['$resource', 'baseURLEmployee', function ($resource, baseURLEmployee) {

            return $resource(baseURLEmployee + "employee/:employeeid", {employeeid:"@employeeid"}, {
                'get':    {method:'GET'},
                'save':   {method:'POST'},
                'query':  {method:'GET', isArray:true},
                'remove': {method:'DELETE'},
                'delete': {method:'DELETE'}, 
                'update': {method:'PUT'} 
            }); 

        }])
        .factory('employeeTypeFactory', ['$resource', 'baseURLEmployeeType', function ($resource, baseURLEmployeeType) {
            return $resource(baseURLEmployeeType + "employeetype/:employeetypeid", {employeetypeid:"@employeetypeid"}, {
                'get':    {method:'GET'},
                'save':   {method:'POST'},
                'query':  {method:'GET', isArray:true},
                'remove': {method:'DELETE'},
                'delete': {method:'DELETE'},
                'update': {method:'PUT'}
            });
        }])
        .factory('requestFactory', ['$resource', 'baseURLRequest', function ($resource, baseURLRequest) {
            return $resource(baseURLRequest + "request/:requestid", {requestid:"@requestid"}, {
                'get':    {method:'GET'},
                'save':   {method:'POST'},
                'query':  {method:'GET', isArray:true},
                'remove': {method:'DELETE'},
                'delete': {method:'DELETE'},
                'update': {method:'PUT'}
            });
        }])
        .factory('employeeRequestFactory', ['$resource', 'baseURLRequest', function ($resource, baseURLEmployee) {
            return $resource(baseURLEmployee + "request/employee/:employeeid", {employeeid:"@employeeid"}, {
                'query':  {method:'GET', isArray:true}
            });

        }])

        .factory('approverRequestFactory', ['$resource', 'baseURLRequest', function ($resource, baseURLEmployee) {
            return $resource(baseURLEmployee + "request/approver/:employeeid", {employeeid:"@employeeid"}, {
                'query':  {method:'GET', isArray:true}
            });

        }])
        .factory('timeOffGroupFactory', ['$resource', 'baseURLTimeOffGroup', function ($resource, baseURLTimeOffGroup) {
            return $resource(baseURLTimeOffGroup + "timeoffgroup/:timeoffgroupid", {timeoffgroupid:"@timeoffgroupid"}, {
                'get':    {method:'GET'},
                'save':   {method:'POST'},
                'query':  {method:'GET', isArray:true},
                'remove': {method:'DELETE'},
                'delete': {method:'DELETE'},
                'update': {method:'PUT'}
            });
        }])


    /*.factory('timeTypeFactory', ['$resource', 'baseURLTimeType', function ($resource, baseURLTimeType) {
        return $resource(baseURLTimeType + "timetype/:timetypeid", {timetypeid:"@timetypeid"}, {
            'get':    {method:'GET'},
            'save':   {method:'POST'},
            'query':  {method:'GET', isArray:true},
            'remove': {method:'DELETE'},
            'delete': {method:'DELETE'},
            'update': {method:'PUT'}
        });
    }])*/

        .factory('timeStateFactory', ['$resource', 'baseURLTimeState', function ($resource, baseURLTimeState) {
            return $resource(baseURLTimeState + "timestate/:timestateid", {timestateid:"@timestateid"}, {
                'get':    {method:'GET'},
                'save':   {method:'POST'},
                'query':  {method:'GET', isArray:true},
                'remove': {method:'DELETE'},
                'delete': {method:'DELETE'},
                'update': {method:'PUT'}
            });
        }])

        .service('approverProperties', [ '$rootScope', function ($rootScope) {
            var employeeSelect = 'none';
            var updateItem = false;
            var requests = [];
            return {
                getRequests: function () {
                    return requests;
                },
                setRequests: function(value) {
                    requests = value;
                    $rootScope.$broadcast('requests:updated',requests);
                },
                getEmployeeSelect: function () {
                    return employeeSelect;
                },
                setEmployeeSelect: function(value) {
                    employeeSelect = value;
                    $rootScope.$broadcast('select:updated',employeeSelect);
                },

                getUpdateItem: function () {
                    return updateItem;
                },
                setUpdateItem: function(value) {
                    updateItem = value;
                    $rootScope.$broadcast('select:approvals',updateItem);
                }
            };
        }])
})();
