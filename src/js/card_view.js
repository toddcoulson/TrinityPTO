angular.module('ptoApp').directive('cardView', ["$filter", function ($filter) {
    return {
        restrict:"E",
        scope: {
            cardobj: '=fcardobj',
            updatedb: '&update',
            deletedb: '&delete',
            adddb: '&add'
        },
        controller: ['$scope','$element', '$attrs', '$location', '$injector', 'timeOffGroupTestFactory', 'timeTypeTestFactory', function ($scope, $element, $attrs, $location, $injector, timeOffGroupTestFactory, timeTypeTestFactory) {
            $scope.timeOffGroups = [];
            $scope.timeOffGroupSelect = {};
            $scope.timeTypes = [];
            $scope.timeTypeSelect = {};
            $scope.dates={};
            $scope.dates.dt = new Date();
            $scope.dates.dt2 = new Date();

            timeOffGroupTestFactory.query().then(function(result) {
                $scope.timeOffGroups = result 
            }).then(function(result){
                timeTypeTestFactory.query().then(function(result) {
                    $scope.timeTypes = result 
                })
            });

            $scope.changeTimeType = function(){
                $scope.cardobj.timeType = $scope.timeTypeSelect.timeType
            }

            $scope.changeTimeOffGroup = function(){
                $scope.cardobj.timeOffGroup = $scope.timeOffGroupSelect.timeOffGroup
            }

            $scope.today = function() {
                $scope.dates.dt = new Date();
                $scope.dates.dt2 = new Date();
            };
            $scope.today();

            $scope.clear = function() {
                $scope.dates.dt = null;
                $scope.dates.dt2 = null;
            };

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

            /*$scope.open = function($event) {
                $scope.popup1.opened = true;
            };

            $scope.open2 = function() {
                $scope.popup2.opened = true;
            };*/

            $scope.open = function($event,opened) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope[opened] = true;
            };

            $scope.setDate = function(year, month, day) {
                $scope.dates.dt = new Date(year, month, day);
            };

            $scope.setDate2 = function(year, month, day) {
                $scope.dates.dt2 = new Date(year, month, day);
            };

            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[0];
            $scope.altInputFormats = ['M!/d!/yyyy'];

            $scope.popup1 = {
                opened: false
            };

            $scope.popup2 = {
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
        templateUrl: 'views/card_view.html' 
    }; 
}]);