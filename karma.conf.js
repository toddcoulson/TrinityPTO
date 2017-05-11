// Karma configuration
// Generated on Fri Apr 21 2017 15:03:57 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'https://sdk.amazonaws.com/js/aws-sdk-2.13.0.min.js',
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/moment/min/moment.min.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'bower_components/angular-ui-router/release/angular-ui-router.min.js',
      'bower_components/angular-ui/build/angular-ui.js',
      'bower_components/angular-resource/angular-resource.min.js',
      'bower_components/bootstrap/dist/js/bootstrap.min.js',
      'bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
      'bower_components/bootstrap-colorpicker/dist/js/bootstrap-colorpicker.min.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'bower_components/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.min.js',
      'src/js/app.js',
      'src/js/services.js', 
      'src/tests/services.spec.js',
      'src/js/controllers.js',
      'src/tests/controllers.spec.js',
      'src/js/employeeFactory.js'
    ],
    exclude: [
    ],
    preprocessors: {
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}