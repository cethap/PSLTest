
 var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {

   onPrepare: function() {
      jasmine.getEnv().addReporter(
        new Jasmine2HtmlReporter({
          savePath: 'target/screenshots'
        })
      );
   },

  seleniumAddress: 'http://localhost:4444/wd/hub',
  multiCapabilities: [
    { browserName: 'chrome' },
    //{ browserName: 'firefox' }
  ],
  // Spec patterns are relative to the location of the spec file. They may
  // include glob patterns.
  suites: {
    doctor: 'tests/e2e/doctor/*-spec.js',
    patient: 'tests/e2e/patient/*-spec.js',
    room: 'tests/e2e/room/*-spec.js',
    rest: 'tests/e2e/weather/*-spec.js'
  },

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true, // Use colors in the command line report.
  }

};