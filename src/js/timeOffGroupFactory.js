'use strict';

angular.module('ptoApp')
    .constant("baseURLTimeOffGroup", "https://pwqlomgq89.execute-api.us-east-1.amazonaws.com/dev/")
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