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
  
  // Before each test load our api.users module
  beforeEach(angular.mock.module('ptoApp'));

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
