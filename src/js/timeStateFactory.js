'use strict';

angular.module('ptoApp')
    .constant("baseURLTimeState", "https://hmmoye191c.execute-api.us-east-1.amazonaws.com/dev/")
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
            get: function(groupid) {
                if (!promise) {
                    promise = resource.get({timestateid: groupid}).$promise.then(function(result) {
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
                    promise = resource.delete({timestateid: groupid}).$promise.then(function(result) {
                        return result;
                    });
                }
                return promise;
            }, 
            delete: function(groupid) {
                if (!promise) {
                    promise = resource.delete({timestateid: groupid}).$promise.then(function(result) {
                        return result;
                    });
                }
                return promise;
            },
            update: function(obj) {
                if (!promise) {
                    promise = resource.update({timestateid: obj.id}, {timeState: obj.entityValue, timeStateColor: obj.entityColor}).$promise.then(function(result) {
                        return result;
                    });
                }
                return promise;
            }
        };
    }])