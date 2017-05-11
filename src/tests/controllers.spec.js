describe('Controllers', function() {
  var InfoController, ContainerController, state;
  var $controller, $location, $window;
  var scopeIC, scopeCC;
  // Load ui.router and our components.users module which we'll create next

  beforeEach(module('ui.router'));
  beforeEach(angular.mock.module('ptoApp.services'));
  beforeEach(angular.mock.module('ptoApp.controller'));
  beforeEach(angular.mock.module('ptoApp.employeeTestFactory'));
  beforeEach(module('ngResource'));
  
  //'$scope', '$rootScope', '$state','$window', '$location','employeeFactory', 'employeeTestFactory'

  beforeEach(inject(function($controller, _$rootScope_, _$location_, _$window_, _employeeTestFactory_, _$httpBackend_, _$state_, _employeeFactory_) {
    scopeIC = _$rootScope_.$new();
    scopeCC = _$rootScope_.$new();
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    InfoController = $controller('InfoController', {
      $scope: scopeIC,
      $rootScope: $rootScope,
      employeeTestFactory:_employeeTestFactory_,
      $state: {}
    });
    ContainerController = $controller('ContainerController', {
      $scope: scopeCC,
      $location: _$location_,
      $window: _$window_,
      $rootScope: $rootScope,
      employeeFactory: _employeeFactory_,
      employeeTestFactory:_employeeTestFactory_,
      $state:_$state_
    });
    /*
      $httpBackend.expectGET("https://tbgspm8rvi.execute-api.us-east-1.amazonaws.com/dev/Employee/").respond([
        {
      "employeeid": "tcoulson@gmail.com",
      "firstName": "Todd",
      "lastName": "Coulson",
      "employeeType": "full-time",
      "totalTimeUsed": 0,
      "totalTimeAccrued": 40
      }
      ]);
    */
  }));

  // Verify our controller exists
  it('InfoController should be defined', function() {
    expect(InfoController).toBeDefined(); 
  });
  
  it('InfoController track displaySection', function() {
    expect(scopeIC.displaySection).toBe(true);
    scopeIC.hideSession();
    expect(scopeIC.displaySection).toBe(false);
    scopeIC.hideSession();
    expect(scopeIC.displaySection).toBe(true);
    expect(scopeIC.displaySection).not.toBe(false);
  });

  it('ContainerController should be defined', function() {
    expect(ContainerController).toBeDefined();
    
  });
  
  it('ContainerController should test calculateUsed on rootscope', function() {
    $rootScope.employee = {
      "employeeid": "tcoulson@gmail.com",
      "firstName": "Todd",
      "lastName": "Coulson",
      "employeeType": "full-time",
      "totalTimeUsed": 0,
      "totalTimeAccrued": 40
    }
    var noReq = [];
    var singleReq = [{"requestedBy": "Todd",
        "approvedBy": "Tom",
        "status": "approved",
        "startDateTime": "3/25/2017",
        "endDateTime": "3/29/2017",
        "timeDuration": "32",
        "message": "I need a vaca",
        "approverMessage": "Take one!",
        "locked": "false",
        "timeState":"approved",
        "timeType":"multiple days",
        "timeOffGroup":"paid time off"}]
    
    $rootScope.calculateUsed(singleReq);
    expect($rootScope.employee.totalTimeUsed).toBe(32);
    $rootScope.calculateUsed(noReq);
    expect($rootScope.employee.totalTimeUsed).toBe(0);
  });
});
