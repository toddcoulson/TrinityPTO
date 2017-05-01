describe('InfoController', function() {
  var InfoController, state;

  // Load ui.router and our components.users module which we'll create next

  beforeEach(angular.mock.module('ptoApp.controller'));
  beforeEach(angular.mock.module('ptoApp.employeeTestFactory'));
  beforeEach(module('ngResource'));

  // Inject the $controller service to create instances of the controller (InfoController) we want to test
  var $controller
  var scope;

  /*beforeEach(function(){
    module(function($provide){
      
      $provide.service('modalSvc', function(){
        this.showModalDialog = jasmine.createSpy('showModalDialog');
      });
    });
    module('services');
  });*/ 

  beforeEach(inject(function($controller,$rootScope, _employeeTestFactory_) {
    scope = $rootScope.$new();
    InfoController = $controller('InfoController', {
      $scope: scope,
      $state: {},
      employeeTestFactory:_employeeTestFactory_
    });
  }));

  // Verify our controller exists
  it('should be defined', function() {
    expect(InfoController).toBeDefined(); 
  });
});


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
});