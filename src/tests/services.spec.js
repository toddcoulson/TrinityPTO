describe('employeeFactory tests', function(){
  var $httpBackend, employeeFactory
  var employeeData = [{
    "employeeid": "tcoulson@gmail.com",
    "firstName": "Todd",
    "lastName": "Coulson",
    "employeeType": "full-time",
    "totalTimeUsed": 0,
    "totalTimeAccrued": 40
  }]
  beforeEach(angular.mock.module('ptoApp.services'));

  beforeEach(inject(function(_employeeFactory_, _$httpBackend_) {
    employeeFactory = _employeeFactory_;
    $httpBackend = _$httpBackend_;
  }));


  // clear all outstanding requests after each tests
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("Employee Factory must get all items", function () {
    expect(employeeFactory).toBeDefined();

    $httpBackend.expectGET("https://tbgspm8rvi.execute-api.us-east-1.amazonaws.com/dev/employee").respond(employeeData);

    // make the user request to the API
    var allEmployeeFactory = employeeFactory.query();
    $httpBackend.flush();

    // test API returned Object
    expect(allEmployeeFactory.length).toBe(1);
    expect(allEmployeeFactory[0].employeeid).toBe('tcoulson@gmail.com');
    expect(allEmployeeFactory[0].firstName).toBe('Todd');
    expect(allEmployeeFactory[0].lastName).toBe('Coulson');
    expect(allEmployeeFactory[0].employeeType).toBe('full-time');
    expect(allEmployeeFactory[0].totalTimeUsed).toBe(0);
    expect(allEmployeeFactory[0].totalTimeAccrued).toBe(40);
  });

  it("Employee Factory must delete", function () {
    expect(employeeFactory).toBeDefined();

    $httpBackend.expectDELETE("https://tbgspm8rvi.execute-api.us-east-1.amazonaws.com/dev/employee/tcoulson@gmail.com").respond({});

    // make the user request to the API
    var deleteEmployeeFactory = employeeFactory.delete(
      {employeeid: "tcoulson@gmail.com"}
    );
    $httpBackend.flush();
    expect(deleteEmployeeFactory).toBeDefined();
  });

  it("Employee Factory must post", function () {
    expect(employeeFactory).toBeDefined();

    $httpBackend.expectPOST("https://tbgspm8rvi.execute-api.us-east-1.amazonaws.com/dev/employee").respond({});

    // make the user request to the API
    var postEmployeeFactory = employeeFactory.save( employeeData );
    $httpBackend.flush();
    expect(postEmployeeFactory).toBeDefined();
  });

})

describe('employeeTypeFactory tests', function(){
  var $httpBackend, employeeTypeFactory
  var employeeTypeData = [{
    "employeetypeid": "12345",
    "employeeType":"admin"
  }]
  beforeEach(angular.mock.module('ptoApp.services'));

  beforeEach(inject(function(_employeeTypeFactory_, _$httpBackend_) {
    employeeTypeFactory = _employeeTypeFactory_;
    $httpBackend = _$httpBackend_;
  }));


  // clear all outstanding requests after each tests
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("Employee Type Factory must get all items", function () {
    expect(employeeTypeFactory).toBeDefined();

    $httpBackend.expectGET("https://313eil8vh4.execute-api.us-east-1.amazonaws.com/dev/employeetype").respond(employeeTypeData);

    // make the user request to the API
    var allEmployeeTypeFactory = employeeTypeFactory.query();
    $httpBackend.flush();

    // test API returned Object
    expect(allEmployeeTypeFactory.length).toBe(1);
    expect(allEmployeeTypeFactory[0].employeetypeid).toBe('12345');
    expect(allEmployeeTypeFactory[0].employeeType).toBe("admin");
  });

  it("Employee Type Factory must delete", function () {

    $httpBackend.expectDELETE("https://313eil8vh4.execute-api.us-east-1.amazonaws.com/dev/employeetype/12345").respond({});

    // make the user request to the API
    var deleteEmployeeTypeFactory = employeeTypeFactory.delete(
      {employeetypeid: "12345"}
    );
    $httpBackend.flush();
    expect(deleteEmployeeTypeFactory).toBeDefined();
  });

  it("Employee Factory must post", function () {
    $httpBackend.expectPOST("https://313eil8vh4.execute-api.us-east-1.amazonaws.com/dev/employeetype").respond({});

    // make the user request to the API
    var postEmployeeTypeFactory = employeeTypeFactory.save( employeeTypeData );
    $httpBackend.flush();
    expect(postEmployeeTypeFactory).toBeDefined();
  });
})

describe('requestFactory tests', function(){
  var $httpBackend, requestFactory
  var requestData = [{
    "requestid": "12345",
    "requestedBy": "Todd",
    "approvedBy": "Tom",
    "status": "approved",
    "startDateTime": "3/25/2017",
    "endDateTime": "3/29/2017",
    "timeDuration": "32",
    "message": "I need a vaca",
    "approverMessage": "Take one!",
    "locked": "false",
    "timeState":"approved",
    "timeOffGroup":"paid time off"
  }]
  beforeEach(angular.mock.module('ptoApp.services'));

  beforeEach(inject(function(_requestFactory_, _$httpBackend_) {
    requestFactory = _requestFactory_;
    $httpBackend = _$httpBackend_;
  }));

  // clear all outstanding requests after each tests
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("Request Factory must get all items", function () {
    expect(requestFactory).toBeDefined();

    $httpBackend.expectGET("https://wou53nmy62.execute-api.us-east-1.amazonaws.com/dev/request").respond(requestData);

    // make the user request to the API
    var allrequestFactory = requestFactory.query();
    $httpBackend.flush();

    // test API returned Object
    expect(allrequestFactory.length).toBe(1);
    expect(allrequestFactory[0].requestedBy).toBe('Todd');
    expect(allrequestFactory[0].approvedBy).toBe('Tom');
    expect(allrequestFactory[0].status).toBe('approved');
    expect(allrequestFactory[0].startDateTime).toBe('3/25/2017');
    expect(allrequestFactory[0].endDateTime).toBe('3/29/2017');
    expect(allrequestFactory[0].timeDuration).toBe('32');
    expect(allrequestFactory[0].message).toBe('I need a vaca');
    expect(allrequestFactory[0].approverMessage).toBe('Take one!');
    expect(allrequestFactory[0].locked).toBe('false');
    expect(allrequestFactory[0].timeState).toBe('approved');
    expect(allrequestFactory[0].timeOffGroup).toBe('paid time off');
  });

  it("Request Factory must delete", function () {

    $httpBackend.expectDELETE("https://wou53nmy62.execute-api.us-east-1.amazonaws.com/dev/request/12345").respond({});

    // make the user request to the API
    var deleterequestFactory = requestFactory.delete(
      {requestid: "12345"}
    );
    $httpBackend.flush();
    expect(deleterequestFactory).toBeDefined();
  });

  it("Employee Factory must post", function () {
    $httpBackend.expectPOST("https://wou53nmy62.execute-api.us-east-1.amazonaws.com/dev/request").respond({});

    // make the user request to the API
    var postrequestFactory = requestFactory.save( requestData );
    $httpBackend.flush();
    expect(postrequestFactory).toBeDefined();
  });
})

describe('timeOffGroupFactory tests', function(){
  var $httpBackend, timeOffGroupFactory
  var timeOffGroupData = [{
    "timeoffgroupid": "12345",
    "timeOffGroup":"Paid Time Off",
    "timeOffGroupColor":"#00FFF0"
  }]
  beforeEach(angular.mock.module('ptoApp.services'));

  beforeEach(inject(function(_timeOffGroupFactory_, _$httpBackend_) {
    timeOffGroupFactory = _timeOffGroupFactory_;
    $httpBackend = _$httpBackend_;
  }));


  // clear all outstanding requests after each tests
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("Time Off Group Factory must get all items", function () {
    expect(timeOffGroupFactory).toBeDefined();

    $httpBackend.expectGET("https://pwqlomgq89.execute-api.us-east-1.amazonaws.com/dev/timeoffgroup").respond(timeOffGroupData);

    // make the user request to the API
    var allTimeOffGroupFactory = timeOffGroupFactory.query();
    $httpBackend.flush();

    // test API returned Object
    expect(allTimeOffGroupFactory.length).toBe(1);
    expect(allTimeOffGroupFactory[0].timeoffgroupid).toBe('12345');
    expect(allTimeOffGroupFactory[0].timeOffGroup).toBe("Paid Time Off");
    expect(allTimeOffGroupFactory[0].timeOffGroupColor).toBe("#00FFF0");
  });

  it("Time Off Group Factory must delete", function () {

    $httpBackend.expectDELETE("https://pwqlomgq89.execute-api.us-east-1.amazonaws.com/dev/timeoffgroup/12345").respond({});

    // make the user request to the API
    var deleteTimeOffGroupFactory = timeOffGroupFactory.delete(
      {timeoffgroupid: "12345"}
    );
    $httpBackend.flush();
    expect(deleteTimeOffGroupFactory).toBeDefined();
  });

  it("Time Off Group Factory must post", function () {
    $httpBackend.expectPOST("https://pwqlomgq89.execute-api.us-east-1.amazonaws.com/dev/timeoffgroup").respond({});

    // make the user request to the API
    var postTimeOffGroupFactory = timeOffGroupFactory.save( timeOffGroupData );
    $httpBackend.flush();
    expect(postTimeOffGroupFactory).toBeDefined();
  });
})

describe('timeState tests', function(){
  var $httpBackend, timeState
  var timeOffGroupData = [{
    "timestateid": "12345",
    "timeState":"Approved",
    "timeStateColor":"#BADA55"
  }]
  beforeEach(angular.mock.module('ptoApp.services'));

  beforeEach(inject(function(_timeStateFactory_, _$httpBackend_) {
    timeStateFactory = _timeStateFactory_;
    $httpBackend = _$httpBackend_;
  }));


  // clear all outstanding requests after each tests
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("Time State Factory must get all items", function () {
    expect(timeStateFactory).toBeDefined();

    $httpBackend.expectGET("https://hmmoye191c.execute-api.us-east-1.amazonaws.com/dev/timestate").respond(timeOffGroupData);

    // make the user request to the API
    var allTimeState = timeStateFactory.query();
    $httpBackend.flush();

    // test API returned Object
    expect(allTimeState.length).toBe(1);
    expect(allTimeState[0].timestateid).toBe('12345');
    expect(allTimeState[0].timeState).toBe("Approved");
    expect(allTimeState[0].timeStateColor).toBe("#BADA55");
  });

  it("Time State Factory must delete", function () {

    $httpBackend.expectDELETE("https://hmmoye191c.execute-api.us-east-1.amazonaws.com/dev/timestate/12345").respond({});

    // make the user request to the API
    var deleteTimeState = timeStateFactory.delete(
      {timestateid: "12345"}
    );
    $httpBackend.flush();
    expect(deleteTimeState).toBeDefined();
  });

  it("Time State Factory must post", function () {
    $httpBackend.expectPOST("https://hmmoye191c.execute-api.us-east-1.amazonaws.com/dev/timestate").respond({});

    // make the user request to the API
    var postTimeState = timeStateFactory.save( timeOffGroupData );
    $httpBackend.flush();
    expect(postTimeState).toBeDefined();
  });
})

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

  var employeeSelect = 
      {
        id: '1',
        name: 'Jane',
        role: 'Designer',
        location: 'New York',
        twitter: 'gijane'
      };

  var updateItem = 
      {
        id: '1',
        name: 'Jane',
        role: 'Designer',
        location: 'New York',
        twitter: 'gijane'
      };

  beforeEach(angular.mock.module('ptoApp.services'));

  // Before each test set our injected Users factory (_Users_) to our local Users variable
  beforeEach(inject(function(_approverProperties_) {
    approverProperties = _approverProperties_;
  }));

  // A simple test to verify the Users factory exists
  it('should set and get requestsList', function() {
    approverProperties.setRequests(requestsList)
    expect(approverProperties.getRequests()).toEqual(requestsList);
    expect(approverProperties.getRequests).toBeDefined();
  });

  it('should be able to add an employeeSelect Item', function() {
    approverProperties.setEmployeeSelect(employeeSelect)
    expect(approverProperties.getEmployeeSelect()).toEqual(employeeSelect);
    expect(approverProperties.getEmployeeSelect).toBeDefined();
  });

  it('should be able to add an update item', function() {
    approverProperties.setUpdateItem(updateItem)
    expect(approverProperties.getUpdateItem()).toEqual(updateItem);
    expect(approverProperties.getUpdateItem).toBeDefined();
  });
});

