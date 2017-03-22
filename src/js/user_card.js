angular.module('ptoApp').directive('userCard', ["$filter", function ($filter) {
    return {
        restrict:"E",
        scope: {
            cardobj: '=cardobj',
            settings: '=settings'
        },
        controller: ['$scope','$element', '$attrs', '$location', '$injector', function ($scope, $element, $attrs, $location, $injector) {
            $scope.editColor = function(){
                $scope.settings.cardType === 'edit' ? $scope.settings.cardType = 'view': $scope.settings.cardType = 'edit';
            }
            
            $scope.cardobj.employeeStartDate = new Date($scope.cardobj.employeeStartDate);
            
            
            $scope.inlineOptions = {
                customClass: getDayClass,
                minDate: new Date(),
                showWeeks: true
            };

            $scope.dateOptions = {
                dateDisabled: disabled,
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1
            };

            // Disable weekend selection
            function disabled(data) {
                var date = data.date,
                    mode = data.mode;
                return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
            }

            $scope.toggleMin = function() {
                $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
                $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
            };

            $scope.toggleMin();

            $scope.open = function($event) {
                console.log("open1:"+$scope.popup1.opened);
                $scope.popup1.opened = true;
            };
            $scope.setDate = function(year, month, day) {
                $scope.dt = new Date(year, month, day);
            };

            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[0];
            $scope.altInputFormats = ['M!/d!/yyyy'];

            /*$scope.settings = {
                cardType: 'view', //edit, view
                timeType: 'daily', //hourly, multiple, daily, editNew, edit
                timeState: 'pending'//approved, denied
            }*/

            $scope.popup1 = {
                opened: false
            };

            
            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            var afterTomorrow = new Date();
            afterTomorrow.setDate(tomorrow.getDate() + 1);
            $scope.events = [
                {
                    date: tomorrow,
                    status: 'full'
                },
                {
                    date: afterTomorrow,
                    status: 'partially'
                }
            ];

            function getDayClass(data) {
                var date = data.date,
                    mode = data.mode;
                if (mode === 'day') {
                    var dayToCheck = new Date(date).setHours(0,0,0,0);

                    for (var i = 0; i < $scope.events.length; i++) {
                        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                        if (dayToCheck === currentDay) {
                            return $scope.events[i].status;
                        }
                    }
                }

                return '';
            }
        }], 
        replace: true,
        templateUrl: 'views/user_card.html' 
    }; 
}]);