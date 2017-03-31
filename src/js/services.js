'use strict';

angular.module('ptoApp')
    .constant("baseURLEmployee", "https://jhwhb4l88l.execute-api.us-east-1.amazonaws.com/dev/")
    .constant("baseURLEmployeeType", "https://313eil8vh4.execute-api.us-east-1.amazonaws.com/dev/")
    .constant("baseURLRequest", "https://nqehj2871e.execute-api.us-east-1.amazonaws.com/dev/")
    .constant("baseURLTimeOffGroup", "https://pwqlomgq89.execute-api.us-east-1.amazonaws.com/dev/")
    .constant("baseURLTimeType", "https://jq2npw66ai.execute-api.us-east-1.amazonaws.com/dev/")
    .constant("baseURLTimeState", "https://hmmoye191c.execute-api.us-east-1.amazonaws.com/dev/")

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


    .factory('employeeTestFactory', ['$resource', 'baseURLEmployee', function ($resource, baseURLEmployee) {
        // $resource definition here
        var resource = $resource(baseURLEmployee + "employee/:employeeid", {employeeid:"@employeeid"}, {
            get: { method:'GET'}
        });

        var promise;

        return {
            get: function(employeeid) {
                if (!promise) {
                    promise = resource.get({employeeid: employeeid}).$promise.then(function(result) {
                        return result;
                    });
                }
                return promise;
            }
        };
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
/*.factory('timeOffGroupFactory', ['$resource', 'baseURLTimeOffGroup', function ($resource, baseURLTimeOffGroup) {
        return $resource(baseURLTimeOffGroup + "timeoffgroup", {timeoffgroupid:"@timeoffgroupid"}, {
            'get':    {method:'GET'},
            'save':   {method:'POST'},
            'query':  {method:'GET', isArray:true},
            'remove': {method:'DELETE'},
            'delete': {method:'DELETE'},
            'update': {method:'PUT'}
        });
}])*/
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

    .factory('timeOffGroupTestFactory', ['$resource', 'baseURLTimeOffGroup', function ($resource, baseURLTimeOffGroup) {
        // $resource definition here
        var resource = $resource(baseURLTimeOffGroup + "timeoffgroup/:timeoffgroupid", {timeoffgroupid:"@timeoffgroupid"}, {
            'get':    {method:'GET'},
            'save':   {method:'POST'},
            'query':  {method:'GET', isArray:true},
            'remove': {method:'DELETE'},
            'delete': {method:'DELETE'},
            'update': {method:'PUT'}
        });

        var promise;

        return {
            get: function(groupid) {
                if (!promise) {
                    promise = resource.get({timeoffgroupid: groupid}).$promise.then(function(result) {
                        return result;
                    });
                }
                return promise;
            }, 
            save: function() {
                if (!promise) {
                    promise = resource.save().$promise.then(function(result) {
                        return result;
                    });
                }
                return promise;
            }, 
            query: function() {
                if (!promise) {
                    promise = resource.query().$promise.then(function(result) {
                        return result;
                    });
                }
                return promise;
            },
            remove: function(groupid) {
                if (!promise) {
                    promise = resource.delete({timeoffgroupid: groupid}).$promise.then(function(result) {
                        return result;
                    });
                }
                return promise;
            }, 
            delete: function(groupid) {
                if (!promise) {
                    promise = resource.delete({timeoffgroupid: groupid}).$promise.then(function(result) {
                        return result;
                    });
                }
                return promise;
            },
            update: function(obj) {
                if (!promise) {
                    promise = resource.update({timeoffgroupid: obj.id}, {timeOffGroup: obj.entityValue, timeOffGroupColor: obj.entityColor}).$promise.then(function(result) {
                        return result;
                    });
                }
                return promise;
            }
        };
    }])


    .factory('timeTypeFactory', ['$resource', 'baseURLTimeType', function ($resource, baseURLTimeType) {
        return $resource(baseURLTimeType + "timetype/:timetypeid", {timetypeid:"@timetypeid"}, {
            'get':    {method:'GET'},
            'save':   {method:'POST'},
            'query':  {method:'GET', isArray:true},
            'remove': {method:'DELETE'},
            'delete': {method:'DELETE'},
            'update': {method:'PUT'}
        });
    }])
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

    .factory('timeStateTestFactory', ['$resource', 'baseURLTimeState', function ($resource, baseURLTimeState) {
        // $resource definition here
        var resource = $resource(baseURLTimeState + "timestate/:timestateid", {timestateid:"@timestateid"}, {
            'get':    {method:'GET'},
            'save':   {method:'POST'},
            'query':  {method:'GET', isArray:true},
            'remove': {method:'DELETE'},
            'delete': {method:'DELETE'},
            'update': {method:'PUT'}
        });

        var promise;

        return {
            get: function(stateid) {
                if (!promise) {
                    promise = resource.get({timestateid: stateid}).$promise.then(function(result) {
                        return result;
                    });
                }
                return promise;
            }, 
            save: function() {
                if (!promise) {
                    promise = resource.save().$promise.then(function(result) {
                        return result;
                    });
                }
                return promise;
            }, 
            query: function() {
                if (!promise) {
                    promise = resource.query().$promise.then(function(result) {
                        return result;
                    });
                }
                return promise;
            },
            remove: function(stateid) {
                if (!promise) {
                    promise = resource.delete({timestateid: stateid}).$promise.then(function(result) {
                        return result;
                    });
                }
                return promise;
            }, 
            delete: function(stateid) {
                if (!promise) {
                    promise = resource.delete({timestateid: stateid}).$promise.then(function(result) {
                        return result;
                    });
                }
                return promise;
            },
            update: function(obj) {
                if (!promise) {
                    promise = resource.update({timestateid: obj.id}, {timestate: obj.entityValue, timeStateColor: obj.entityColor}).$promise.then(function(result) {
                        return result;
                    });
                }
                return promise;
            }
        };
    }]);
