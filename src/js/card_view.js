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
            $scope.times={};
            $scope.times.startTime = new Date(1970, 0, 1, 11, 00, 0);
            $scope.times.endTime = new Date(1970, 0, 1, 11, 30, 0);
            $scope.dt = new Date();

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

            function combineDateWithTime(d, t)
            {
                return new Date(
                    d.getFullYear(),
                    d.getMonth(),
                    d.getDate(),
                    t.getHours(),
                    t.getMinutes(),
                    t.getSeconds(),
                    t.getMilliseconds()
                );
            }
            $scope.onApprove = function(){
                $scope.cardobj.timeState = "approved";
                $scope.updatedb({value: $scope.cardobj});
            }
            $scope.onDeny = function(){
                $scope.cardobj.timeState = "denied";
                $scope.updatedb({value: $scope.cardobj});
            }
            
            $scope.close = function(){
                $scope.deletedb({value: $scope.cardobj});
            }
            
            $scope.edit = function(){
                $scope.cardobj.cardState = "edit";
            }

            $scope.submit=function(){

                $scope.cardobj.startDateTime = combineDateWithTime($scope.dates.dt,$scope.times.startTime);
                $scope.cardobj.endDateTime = combineDateWithTime($scope.dates.dt2,$scope.times.endTime);

                if($scope.cardobj.cardState === 'edit'){
                    $scope.updatedb({value: $scope.cardobj});
                } else if($scope.cardobj.cardState === 'add'){
                    $scope.adddb({value: $scope.cardobj});
                    console.log($scope.adddb)
                }
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
                maxDate: $scope.dates.dt2,
                minDate: new Date(),
                startingDay: 1
            };

            $scope.dateOptions2 = {
                dateDisabled: disabled,
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: $scope.dates.dt,
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

            $scope.open = function($event,opened) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope[opened] = true;
                $scope.dateOptions.maxDate = $scope.dates.dt2;
                $scope.dateOptions2.minDate = $scope.dates.dt;
            };
            $scope.minDate = function(){
                return new Date($scope.dates.dt);
            }

            $scope.maxDate = function(){
                return new Date($scope.dates.dt2);
            }

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