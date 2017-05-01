// conf.js
exports.config = {
  framework: 'jasmine',
  specs: ['googlePage.js','spec.js'],
  onPrepare: function () {
    global.isAngularSite = function (flag) {
      console.log('Switching to ' + (flag ? 'Asynchronous' : 'Synchronous') + ' mode.')
      browser.ignoreSynchronization = !flag;
    },
      global.BROWSER_WAIT = 5000;
  }
}