// conf.js
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['googlePage.js','spec.js'],
  onPrepare: function () {
    global.isAngularSite = function (flag) {
      console.log('Switching to ' + (flag ? 'Asynchronous' : 'Synchronous') + ' mode.')
      browser.ignoreSynchronization = !flag;
    },
      global.BROWSER_WAIT = 5000;
  }
}