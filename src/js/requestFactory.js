'use strict';

angular.module('ptoApp')
//.constant("baseURLRequest", "https://1919b06afk.execute-api.us-east-1.amazonaws.com/dev/")//trin
    .constant("baseURLRequest", "https://wou53nmy62.execute-api.us-east-1.amazonaws.com/dev/")//tc
    .factory('requestTestFactory', ['$resource', 'baseURLRequest', function ($resource, baseURLRequest) {
        // $resource definition here
        var resource = $resource(baseURLRequest + "request/:requestid", {requestid:"@requestid"}, {
            'get':    {method:'GET'},
            'save':   {method:'POST'},
            'query':  {method:'GET', isArray:true},
            'remove': {method:'DELETE'},
            'delete': {method:'DELETE'},
            'update': {method:'PUT'}
        });

        var promise;

        return {
            get: function(requestid) {
                if (!promise) {
                    promise = resource.get({requestid: requestid}).$promise.then(function(result) {
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
            remove: function(requestid) {
                if (!promise) {
                    promise = resource.delete({requestid: requestid}).$promise.then(function(result) {
                        return result;
                    });
                }
                return promise;
            }, 
            delete: function(requestid) {
                if (!promise) {
                    promise = resource.delete({requestid: requestid}).$promise.then(function(result) {
                        return result;
                    });
                }
                return promise;
            },
            update: function(obj) {
                if (!promise) {
                    promise = resource.update({requestid: obj.requestid}, {"requestedBy": obj.requestedBy,
                                                                           "approvedBy": obj.approvedBy,
                                                                           "startDateTime": obj.startDateTime,
                                                                           "endDateTime": obj.endDateTime,
                                                                           "timeDuration": Number(obj.timeDuration),
                                                                           "message": obj.message,
                                                                           "approverMessage": obj.approverMessage,
                                                                           "locked": obj.locked,
                                                                           "timeState":obj.timeState,
                                                                           "timeType":obj.timeType,
                                                                           "timeOffGroup":obj.timeOffGroup}).$promise.then(function(result) {

                        return result;
                    });
                }
                return promise;
            }
        };
    }])