exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  multiCapabilities: [
    {
      browserName: 'chrome'
    },
    /*{
      browserName: 'firefox'
    }*/
  ],
  // Spec patterns are relative to the location of the spec file. They may
  // include glob patterns.
  suites: {
    doctor: 'tests/e2e/doctor/*-spec.js'
  },

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true, // Use colors in the command line report.
  }  
};