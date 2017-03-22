angular.module('ptoApp').directive('colorChangeCard', ["$filter", function ($filter) {
    return {
        restrict:"E",
        scope: {
            cardtitle: '@',
            cardobj: '=',
            updatedb: '&update'
        },
        controller: ['$scope','$element', '$attrs', '$location', '$injector', function ($scope, $element, $attrs, $location, $injector) {
            $scope.colorChange={color:"#FFF"};
            $scope.editColor = function(){
                $scope.cardobj.cardState === 'edit' ? $scope.cardobj.cardState = 'view': $scope.cardobj.cardState = 'edit';
                if($scope.cardobj.cardState === 'view'){
                    $scope.updatedb({value: $scope.cardobj});
                } 
            }
        }], 
        replace: true,
        templateUrl: 'views/color_change_card.html' 
    }; 
}]);

$(function() {
    console.log("getting color picker");
        $('#cp2').colorpicker();
    });