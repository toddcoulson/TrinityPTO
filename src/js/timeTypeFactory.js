'use strict';

angular.module('ptoApp')
    .constant("baseURLTimeType", "https://jq2npw66ai.execute-api.us-east-1.amazonaws.com/dev/")
    .factory('timeTypeTestFactory', ['$resource', 'baseURLTimeType', function ($resource, baseURLTimeType) {
        // $resource definition here
        var resource = $resource(baseURLTimeType + "timetype/:timetypeid", {timetypeid:"@timetypeid"}, {
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
                    promise = resource.get({timetypeid: groupid}).$promise.then(function(result) {
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
                    promise = resource.delete({timetypeid: groupid}).$promise.then(function(result) {
                        return result;
                    });
                }
                return promise;
            }, 
            delete: function(groupid) {
                if (!promise) {
                    promise = resource.delete({timetypeid: groupid}).$promise.then(function(result) {
                        return result;
                    });
                }
                return promise;
            },
            update: function(obj) {
                if (!promise) {
                    promise = resource.update({timetypeid: obj.id}, {timeType: obj.entityValue}).$promise.then(function(result) {
                        return result;
                    });
                }
                return promise;
            }
        };
    }])