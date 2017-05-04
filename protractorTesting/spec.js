describe('Protractor Demo App', function() {
  it('should have a title', function() {
    browser.get('http://localhost:9000/#!/employee');

    expect(browser.getTitle()).toEqual('TrinityIT Time Off Tracking');
  //browser.call(byPassLogin, this)
    
    //element(by.css('.info')).evaluate('byPassLogin()');
    
     browser.sleep(30000);
  });
});

