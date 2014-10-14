module.exports = function (config) {
    'use strict';
    config.set({
        basePath: '',

        frameworks: ['mocha', 'requirejs'],

        files: [{
                pattern: 'bower_components/**/*.js',
                included: false
            }, {
                pattern: 'src/*.js',
                included: false
            }, {
                pattern: 'tests/*.spec.js',
                included: false
            },
            'tests/main.js'
        ],

        reporters: ['progress', 'coverage'],

        preprocessors: {
            'src/*.js': ['coverage']
        },

        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },

        port: 9998,
        colors: true,
        autoWatch: false,
        singleRun: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_WARN,

        browsers: ['PhantomJS']
    });
};
