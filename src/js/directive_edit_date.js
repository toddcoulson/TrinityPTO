angular.module('ptoApp').directive('selectDate', function () {
    return {
        scope: {
            value: '=',
            record: '=',
            record2: '=',
            inputname: '@',
            servicename: '@',
            dateFormat: '=?',
            action: '@',
            max: '=?',
            min: '=?' },
        controller: function ($scope, $element, $attrs, $location, $injector, $timeout,
                               coreService) {
            $(document).keydown(function(e){
                if($scope.editing && e.keyCode =='13')
                    $scope.submit()
                    });
            var service = $injector.get($scope.servicename);
            $scope.editing = false;
            $scope.oldval ="";
            $scope.edit = function () {
                $scope.oldval = $scope.value;
                $scope.editing = true;
            };
            $scope.submit=function(){
                $scope.editing = false;
                if($scope.record2 == undefined){
                    service[$scope.action]($scope.record, $scope.value);
                }else{
                    service[$scope.action]($scope.record, $scope.record2, $scope.value);
                } }
            $scope.cancel = function(){
                $scope.value = $scope.oldval;
                $scope.editing = false;
            }
            $scope.datepickers = {};
            $scope.open = function() {
                $timeout(function() {
                    $scope.opened = true;
                }); };
            $scope.openDatePicker = function(dateFieldName) {
                $timeout(function() {
                    $scope.datepickers[dateFieldName] = true;
                    $element[$scope.inputname].open($event);
                });
            };
        },
        restrict:"E",
        replace: true,
        templateUrl: obj + 'tm_template_select_date.html'
    }; 
});