angular.module('ptoApp').directive('editInput', function () {
    return {
        scope: {
            value: '=',
            record: '=',
            record2: '=',
            servicename: '@',
            action: '@',
            currencyOn: '@',
            inputtype: '@?',
            minValue: '=?',
            maxValue: '@?'
        },
        controller: function ($scope, $element, $attrs, $location, $injector) {
            $attrs.hasOwnProperty('currencyOn') ? $scope.currencyOn = true :
            $scope.currencyOn = false;
            var service = $injector.get($scope.servicename);
            $scope.editing = false;
            $scope.oldval ="";
            $scope.edit = function () {
                $scope.oldval = $scope.value;
                $scope.editing = true;
            };
            $scope.submit=function(){
                if($scope.record2 == undefined){
                    service[$scope.action]($scope.record, $scope.value);
                    console.log("no second record")
                }else{
                    service[$scope.action]($scope.record, $scope.record2, $scope.value);
                    console.log(" second record exists")
                }
                $scope.editing = false;
            }
            $scope.cancel = function(){
                $scope.value = $scope.oldval;
                $scope.editing = false;
            } },
        restrict:"E",
        replace: true,
        templateUrl: 'template_editable_input.html'
    }; 
});