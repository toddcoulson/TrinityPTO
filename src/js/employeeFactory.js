'use strict';

angular.module('ptoApp')
    .constant("baseURLEmployee", "https://jhwhb4l88l.execute-api.us-east-1.amazonaws.com/dev/")

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
    }]);
