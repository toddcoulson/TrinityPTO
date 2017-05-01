describe('Approver Properties factory add Requests', function() {
  var approverProperties;
  var requestsList = [
    {
      id: '1',
      name: 'Jane',
      role: 'Designer',
      location: 'New York',
      twitter: 'gijane'
    },
    {
      id: '2',
      name: 'Bob',
      role: 'Developer',
      location: 'New York',
      twitter: 'billybob'
    }
  ];
  beforeEach(angular.mock.module('ptoApp.services'));

  // Before each test set our injected Users factory (_Users_) to our local Users variable
  beforeEach(inject(function(_approverProperties_) {
    approverProperties = _approverProperties_;
  }));

  // A simple test to verify the Users factory exists
  it('should exist', function() {
    approverProperties.setRequests(requestsList)
    expect(approverProperties.getRequests()).toEqual(requestsList);
    expect(approverProperties.getRequests).toBeDefined();
  });
});

describe('Approver Properties factory add selected Employee', function() {
  var approverProperties;

  var employeeSelect = 
    {
      id: '1',
      name: 'Jane',
      role: 'Designer',
      location: 'New York',
      twitter: 'gijane'
    };
  
  // Before each test load our api.users module
  beforeEach(angular.mock.module('ptoApp.services'));

  // Before each test set our injected Users factory (_Users_) to our local Users variable
  beforeEach(inject(function(_approverProperties_) {
    approverProperties = _approverProperties_;
  }));

  // A simple test to verify the Users factory exists
  it('should exist', function() {
    approverProperties.setEmployeeSelect(employeeSelect)
    expect(approverProperties.getEmployeeSelect()).toEqual(employeeSelect);
    expect(approverProperties.getEmployeeSelect).toBeDefined();
  });
});

describe('Approver Properties factory add selected Employee', function() {
  var approverProperties;

  var updateItem = 
    {
      id: '1',
      name: 'Jane',
      role: 'Designer',
      location: 'New York',
      twitter: 'gijane'
    };
  
  // Before each test load our api.users module
  beforeEach(angular.mock.module('ptoApp.services'));

  // Before each test set our injected Users factory (_Users_) to our local Users variable
  beforeEach(inject(function(_approverProperties_) {
    approverProperties = _approverProperties_;
  }));

  // A simple test to verify the Users factory exists
  it('should exist', function() {
    approverProperties.setUpdateItem(updateItem)
    expect(approverProperties.getUpdateItem()).toEqual(updateItem);
    expect(approverProperties.getUpdateItem).toBeDefined();
  });
});