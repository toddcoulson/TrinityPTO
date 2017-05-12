'use strict';

angular.module('ptoApp.employeeTestFactory')
//.constant("baseURLEmployee", "https://n6l0eglcu8.execute-api.us-east-1.amazonaws.com/dev/")//Trin
    .constant("baseURLEmployee", "https://tbgspm8rvi.execute-api.us-east-1.amazonaws.com/dev/")//TC

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
            },
            findByName: function(data){
                return data;
            }
        };
    }]);
