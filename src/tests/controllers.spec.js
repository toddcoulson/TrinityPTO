describe('Controllers', function() {
  var InfoController, ContainerController, state;
  var $controller, $location, $window;
  var scopeIC, scopeCC;
  // Load ui.router and our components.users module which we'll create next

  beforeEach(module('ui.router'));
  beforeEach(angular.mock.module('ptoApp.controller'));
  beforeEach(angular.mock.module('ptoApp.employeeTestFactory'));
  beforeEach(module('ngResource'));
  
  //'$scope', '$rootScope', '$state','$window', '$location','employeeFactory', 'employeeTestFactory'

  beforeEach(inject(function($controller, _$rootScope_, _$location_, _$window_, _employeeTestFactory_, _$httpBackend_, _$state_) {
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
    ContainerController = $controller('InfoController', {
      $scope: scopeCC,
      $location: _$location_,
      $window: _$window_,
      $rootScope: $rootScope,
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
    expect(ContainerController).toBeDefined();
    $rootScope.employee = {
      "employeeid": "tcoulson@gmail.com",
      "firstName": "Todd",
      "lastName": "Coulson",
      "employeeType": "full-time",
      "totalTimeUsed": 0,
      "totalTimeAccrued": 40
    }
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
  });


});

/*
describe('Employee factory', function() {
  var Employee, $q, $httpBackend;

  // Add Pokeapi endpoint
  var API = 'https://tbgspm8rvi.execute-api.us-east-1.amazonaws.com/dev/Employee/';

  // Add mocked Pokéapi response
  var RESPONSE_SUCCESS = {
    'id': 'tcoulson@gmail.com',
    'firstName': 'Todd',
    'lastName': 'Coulson'
  };

  beforeEach(angular.mock.module('ptoApp.employeeTestFactory'));
  beforeEach(module('ngResource'));

  // Inject $q and $httpBackend for testing HTTP requests
  beforeEach(inject(function(_employeeTestFactory_, _$q_, _$httpBackend_) {
    Employee = _employeeTestFactory_;
    $q = _$q_;
    $httpBackend = _$httpBackend_;
  }));

  it('should exist', function() {
    expect(Employee).toBeDefined();
  });

  describe('findByName()', function() {
    var result;

    beforeEach(function() {
      result = {};
      spyOn(Employee, "findByName").and.callThrough();
    });

    it('should return a Employee when called with a valid name', function() {
      var search = 'todd';
      $httpBackend.whenGET(API + search).respond(200, $q.when(RESPONSE_SUCCESS));

      expect(Employee.findByName).not.toHaveBeenCalled();
      expect(result).toEqual({});

      Employee.findByName(search)
      .then(function(res) {
        result = res;
      });
      $httpBackend.flush();

      expect(Employee.findByName).toHaveBeenCalledWith(search);
      expect(result.firstName).toEqual('Todd');
      expect(result.lastName).toContain('Coul');
      expect(result.id).toEqual('tcoulson@gmail.com');
    });

    it('should return a 404 when called with an invalid name', function() {
      // Update search term
      var search = 'godzilla';

      // Update status code and response object (reject instead of when/resolve)
      $httpBackend.whenGET(API + search).respond(404, $q.reject(RESPONSE_ERROR));

      expect(Employee.findByName).not.toHaveBeenCalled();
      expect(result).toEqual({});

      // Update chained method to catch
      Employee.findByName(search)
      .catch(function(res) {
        result = res;
      });
      $httpBackend.flush();

      expect(Employee.findByName).toHaveBeenCalledWith(search);
      expect(result.detail).toEqual('Not found.');
    });
  });
});*/