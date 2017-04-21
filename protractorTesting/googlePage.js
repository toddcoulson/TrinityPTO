/* global element, browser, by */

'use strict';

var GOOGLE_USERNAME = 'tcoulson@google.com';
var GOOGLE_PASSWORD = 'marathon9';
var ec = protractor.ExpectedConditions;

var Google = function () {
  this.emailInput = element(by.id('Email'));
  this.passwordInput = element(by.id('Passwd'));
  this.nextButton = element(by.id('next'));
  this.signInButton = element(by.id('signIn'));
  this.approveAccess = element(by.id('submit_approve_access'));

  this.loginToGoogle = function () {
    var self = this;

    /* Entering non angular site, it instructs webdriver to switch 
       to synchronous mode. At this point I assume we are on google
       login page */ 
    isAngularSite(false); 
    this.emailInput.sendKeys(GOOGLE_USERNAME);
    this.nextButton.click();

    this.passwordInput.isPresent().then(function () {
      browser.wait(ec.visibilityOf(self.passwordInput), BROWSER_WAIT).then(function () {
        self.passwordInput.sendKeys(GOOGLE_PASSWORD);
        self.signInButton.click();
        browser.wait(ec.elementToBeClickable(self.approveAccess), BROWSER_WAIT).then(function () {
          self.approveAccess.click();
          /* Now we are being redirected to our app, switch back to
             async mode (page with angular) */
          isAngularSite(true);
        });
      });
    });
  }
}

module.exports = new Google();