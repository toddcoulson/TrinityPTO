angular.module('ptoApp').directive('ruleCard', ["$filter", function ($filter) {
    return {
        restrict:"E",
        scope: {
            cardobj: '=cardobj',
            settings: '=settings'
        },
        controller: ['$scope','$element', '$attrs', '$location', '$injector', function ($scope, $element, $attrs, $location, $injector) {
            console.log($scope.cardobj.timeOffGroup);
            
        }], 
        replace: true,
        templateUrl: 'views/rule_card.html' 
    }; 
}]);