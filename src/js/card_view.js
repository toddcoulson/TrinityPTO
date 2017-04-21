angular.module('ptoApp').directive('cardView', ["$filter", function ($filter) {
    return {
        restrict:"E",
        scope: {
            cardobj: '=fcardobj',
            updatedb: '&update',
            deletedb: '&delete',
            adddb: '&add'
        },
        link:function(scope, element, attrs, ctrl){                

            scope.$watch(scope.cardobj, function(){
                var sd = new Date(scope.cardobj.startDateTime);
                var ed = new Date(scope.cardobj.endDateTime);
                if(scope.cardobj.cardState !== 'edit' && scope.cardobj.cardState !== 'add'){
                    scope.cardobj.timeDuration = ctrl.determineDays(sd, ed, sd, ed);
                }

            }, true);

        },
        controller: ['$scope','$element', '$attrs', '$location', '$injector', 'timeOffGroupTestFactory', 'timeStateTestFactory', function ($scope, $element, $attrs, $location, $injector, timeOffGroupTestFactory, timeStateTestFactory) {
            $scope.timeOffGroups = [];
            $scope.timeOffGroupSelect = {};
            $scope.timeStates = [];
            $scope.timeStatesSelect = {};
            $scope.dates={};
            $scope.dates.dt1 = new Date();
            $scope.dates.dt2 = new Date();
            $scope.times={};
            $scope.times.startTime = new Date(1970, 0, 1, 8, 30, 0);
            $scope.times.endTime = new Date(1970, 0, 1, 9, 30, 0);
            $scope.hstep = 1;
            $scope.mstep = 15;
            $scope.ismeridian = true;

            $scope.determineDays = this.determineDays = function(start, end, startTime, endTime){
                var cpStart = new Date(start);
                var cpEnd = new Date(end);
                var cpStartTime = new Date(startTime);
                var cpEndTime = new Date(endTime);
                var holiday = [
                    new Date('2017-01-01T00:00:00Z'),
                    new Date('2017-01-16T00:00:00Z'),
                    new Date('2017-02-20T00:00:00Z'),
                    new Date('2017-05-29T00:00:00Z'),
                    new Date('2017-07-04T00:00:00Z'),
                    new Date('2017-09-04T00:00:00Z'),
                    new Date('2017-10-09T00:00:00Z'),
                    new Date('2017-11-10T00:00:00Z'),
                    new Date('2017-11-23T00:00:00Z'),
                    new Date('2017-12-25T00:00:00Z')
                ] 
                var i = holiday.length
                var n_days = 0;
                var n_hours = 0;
                while (i--) { // loop over holidays
                    if (holiday[i] >= cpStart)
                        if (holiday[i] <= cpEnd)
                            n_days = n_days - 1; // day holiday within dates
                }
                
                while (cpStart <= cpEnd) {
                    
                    if (cpStart.getUTCDay() != 0 && cpStart.getUTCDay() != 6) n_days = n_days + 1; // not sunday
                    cpStart.setUTCHours(24); // add a day
                }

                console.log("days: "+n_days)
                
                if(n_days > 1){

                    var eod = new Date(cpStartTime);
                    eod.setHours(17, 30, 0);

                    var startHours = eod - cpStartTime;
                    startHours = ((startHours/1000)/60)/60;
                    n_hours += startHours;


                    var bod = new Date(cpEndTime);
                    bod.setHours(8, 30, 0);
                    var endHours = cpEndTime-bod;
                    endHours = ((endHours/1000)/60)/60;
                    n_hours += endHours;

                }else{
                    console.log(cpEndTime - cpStartTime)
                    console.log(cpEndTime, cpStartTime)
                    var giveHours = cpEndTime.getHours() - cpStartTime.getHours();
                    giveHours += (cpEndTime.getMinutes()/60);
                    giveHours -= (cpStartTime.getMinutes()/60);
                    n_hours += giveHours;
                }
                if(n_days>2){
                    n_days = n_days -2;
                    n_hours += n_days * 8;
                }
                
                $scope.n_hours = n_hours;
                return n_hours;
            }


            $scope.changeTime = function(){
                if($scope.times.startTime.getHours() > 17){
                    $scope.times.startTime = new Date(1970, 0, 1, 17, 00, 0);

                }
                if($scope.times.endTime.getHours() > 17){
                    $scope.times.endTime= new Date(1970, 0, 1, 17, 00, 0);
                }
                if($scope.times.startTime.getHours() < 8){
                    $scope.times.startTime = new Date(1970, 0, 1, 8, 00, 0);
                }
                if($scope.times.endTime.getHours() < 8){
                    $scope.times.endTime = new Date(1970, 0, 1, 8, 00, 0);
                }
                $scope.determineDays($scope.dates.dt1, $scope.dates.dt2, $scope.times.startTime, $scope.times.endTime);
                if($scope.n_hours < 0 ){
                    $scope.times.endTime = $scope.times.startTime;
                }
            }

            timeOffGroupTestFactory.query().then(function(result) {
                $scope.timeOffGroups = result 
            }).then(function(result){
                timeStateTestFactory.query().then(function(result) {
                    $scope.timeStates = result 
                })
            });

            $scope.$watch('dates.dt1', function (newValue, oldValue, scope) {
                if(typeof $scope.cardobj != 'undefined')
                    $scope.cardobj.timeDuration = $scope.determineDays($scope.dates.dt1, $scope.dates.dt2, $scope.times.startTime, $scope.times.endTime);
            });
            $scope.$watch('dates.dt2', function (newValue, oldValue, scope) {
                if(typeof $scope.cardobj != 'undefined')$scope.cardobj.timeDuration = $scope.determineDays($scope.dates.dt1, $scope.dates.dt2, $scope.times.startTime, $scope.times.endTime);
            });
            $scope.$watch('times.endTime', function (newValue, oldValue, scope) {
                if(typeof $scope.cardobj != 'undefined')$scope.cardobj.timeDuration = $scope.determineDays($scope.dates.dt1, $scope.dates.dt2, $scope.times.startTime, $scope.times.endTime);
            });
            $scope.$watch('times.startTime', function (newValue, oldValue, scope) {
                if(typeof $scope.cardobj != 'undefined')$scope.cardobj.timeDuration = $scope.determineDays($scope.dates.dt1, $scope.dates.dt2, $scope.times.startTime, $scope.times.endTime);
            });
            /*
            $scope.$watch('cardobj.startDateTime', function (newValue, oldValue, scope) {
                if(cardobj.cardState !== 'edit' && cardobj.cardState !== 'add'){
                    cardobj.timeDuration = $scope.determineDays(cardobj.startDateTime, cardobj.endDateTime, cardobj.startDateTime, cardobj.endDateTime);
                }

            });

            $scope.$watch('cardobj.endDateTime', function (newValue, oldValue, scope) {

                cardobj.timeDuration = $scope.determineDays(dates.dt1, dates.dt2, times.startTime, times.endTime);
            });*/


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
                $scope.dates.dt1 = new Date($scope.cardobj.startDateTime);
                $scope.dates.dt2 = new Date($scope.cardobj.endDateTime);
                $scope.times.startTime = new Date($scope.cardobj.startDateTime);
                $scope.times.endTime = new Date($scope.cardobj.endDateTime);
                document.getElementById('selectTimeOffGroup').value=$scope.cardobj.timeOffGroup;
                if($scope.cardobj.cardState == "review"){
                    $scope.cardobj.cardState = "reviewedit";
                }else{
                    $scope.cardobj.cardState = "edit";
                }

            }

            $scope.submit=function(){
                if($scope.cardobj.cardState === 'edit' || $scope.cardobj.cardState === 'add') {
                    $scope.cardobj.startDateTime = combineDateWithTime($scope.dates.dt1,$scope.times.startTime);
                    $scope.cardobj.endDateTime = combineDateWithTime($scope.dates.dt2,$scope.times.endTime);
                }else if($scope.cardobj.cardState === 'reviewedit'){
                    $scope.cardobj.startDateTime = combineDateWithTime($scope.dates.dt1,$scope.times.startTime);
                    $scope.cardobj.endDateTime = combineDateWithTime($scope.dates.dt2,$scope.times.endTime);
                }
                if($scope.cardobj.cardState === 'edit'){
                    $scope.updatedb({value: $scope.cardobj});
                } else if($scope.cardobj.cardState === 'add'){
                    $scope.adddb({value: $scope.cardobj});
                }else if($scope.cardobj.cardState === 'review'){
                    $scope.updatedb({value: $scope.cardobj});
                }

                $scope.timeOffGroups.forEach(function(tog, index2){
                    if($scope.cardobj.timeOffGroup.toLowerCase() == tog.timeOffGroup.toLowerCase()){
                        $scope.cardobj.timeOffGroupColor = tog.timeOffGroupColor;
                    }
                })
                $scope.timeStates.forEach(function(ts, index3){
                    if($scope.cardobj.timeState.toLowerCase() == ts.timeState.toLowerCase()){
                        $scope.cardobj.timeStateColor = ts.timeStateColor;
                    }
                })

                if($scope.cardobj.cardState === 'edit' || $scope.cardobj.cardState === 'add') {
                    $scope.cardobj.cardState = "view";
                }else if($scope.cardobj.cardState === 'reviewedit'){
                    $scope.cardobj.cardState = "review";
                }
            }

            $scope.today = function() {
                $scope.dates.dt1 = new Date();
                $scope.dates.dt2 = new Date();
            };
            $scope.today();

            $scope.clear = function() {
                $scope.dates.dt1 = null;
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
                maxDate: new Date(2020, 1, 1),
                minDate: new Date(),
                startingDay: 1
            };

            $scope.dateOptions2 = {
                dateDisabled: disabled,
                formatYear: 'yy',
                maxDate: new Date(2020, 1, 1),
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
            $scope.checkDates = function(){
                if($scope.dates.dt2 < $scope.dates.dt1){
                    $scope.dates.dt2 = $scope.dates.dt1;
                }
            }

            $scope.open = function($event,opened) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope[opened] = true;
                $scope.dateOptions.minDate = new Date();
                $scope.dateOptions2.minDate = new Date();

            };
            $scope.minDate = function(){
                return new Date($scope.dates.dt1);
            }

            $scope.maxDate = function(){
                return new Date($scope.dates.dt2);
            }

            $scope.setDate = function(year, month, day) {
                $scope.dates.dt1 = new Date(year, month, day);
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