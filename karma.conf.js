'use strict';

const webpackConfig = require('./config/webpack.test.js');

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',
    frameworks: ['mocha', 'chai', 'sinon', 'chai-sinon'],
    port: 9876,
    colors: true,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity,
    webpack: webpackConfig,
    webpackMiddleware: {
      // webpack-dev-middleware configuration
      noInfo: true,
      // and use stats to turn off verbose output
      stats: {
        chunks: false
      }
    },

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR ||
    // config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // list of files / patterns to load in the browser
    files: [
      {pattern: './client/app.js'},
      {pattern: './node_modules/angular-mocks/angular-mocks.js'},
      {pattern: './node_modules/bardjs/bard.js'},
      {pattern: './node_modules/sinon/pkg/sinon.js'},
      {pattern: './node_modules/karma-read-json/karma-read-json.js'},
      {pattern: './node_modules/bardjs/bard.js'},
      {pattern: './tests/test-helpers/*.js'},
      {pattern: './tests/**/*.js'},
      {pattern: './tests/**/*.json', included: false, served: true, nocache: false},
      {pattern: './client/assets/images/providers/*.svg', included: false, served: true, nocache: false},
    ],

    proxies: {
      '/images/': '/images/',
    },

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './tests/**/*.js': ['babel'],
      './client/app.js': ['webpack'],
    },

    // test results reporter to use
    // possible values: 'dots', 'progress', 'coverage'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage', 'clear-screen'],

    coverageReporter: {
      dir: './reports/coverage',
      reporters: [
        {type: 'json', subdir: 'json', file: 'coverage-final.json'},
        {type: 'text-summary'}
      ]
    },
  });
};
