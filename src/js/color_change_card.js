angular.module('ptoApp').directive('colorChangeCard', ["$filter", function ($filter) {
    return {
        restrict:"E",
        scope: {
            cardtitle: '@',
            cardobj: '=',
            updatedb: '&update',
            deletedb: '&delete',
            adddb: '&add'
        },
        controller: ['$scope','$element', '$attrs', '$location', '$injector', function ($scope, $element, $attrs, $location, $injector) {
            $scope.colorChange={color:"#FFF"};
            $scope.delete = function(){
                $scope.deletedb({value: $scope.cardobj.id});
            }
            $scope.submit=function(){
                if($scope.cardobj.cardState === 'edit'){
                    $scope.updatedb({value: $scope.cardobj});
                } else if($scope.cardobj.cardState === 'add'){
                    $scope.adddb({value: $scope.cardobj});
                }
            }
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
        $('#cp2').colorpicker();
    });