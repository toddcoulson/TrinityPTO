describe('Protractor Demo App', function() {
  it('should have a title', function() {
    browser.get('http://localhost:9000/');
    
    element(by.id('gLogin')).click();

    expect(browser.getTitle()).toEqual('TrinityIT Time Off Tracking');
    
     browser.sleep(5000);
  });
});

