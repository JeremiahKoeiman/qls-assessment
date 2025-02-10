// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('karma-junit-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      // setting clearContext to config because of this issue: https://github.com/angular/angular-cli/issues/28271#issuecomment-2310883500
      clearContext: config.singleRun // leave Jasmine Spec Runner output visible in browser
    },
    coverageReporter: {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      dir: require('path').join(__dirname, '../../../test-output/coverage/qls/libs/authentication'),
      reporters: [{ type: 'html' }, { type: 'text-summary' }, { type: 'cobertura' }],
      subdir: '.'
    },
    reporters: ['progress', 'kjhtml', 'junit'],
    junitReporter: {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      outputDir: require('path').join(__dirname, '../../../test-output/unittests/qls/libs/authentication'),
      useBrowserName: false
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeWithoutDefaultSearch'],
    customLaunchers: {
      ChromeWithoutDefaultSearch: {
        base: 'Chrome',
        flags: ['-disable-search-engine-choice-screen']
      }
    },
    singleRun: false,
    restartOnFileChange: true
  });
};
