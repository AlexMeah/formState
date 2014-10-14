var tests = Object.keys(window.__karma__.files).filter(function (file) {
    return /\.spec\.js$/.test(file);
});

require.config({
    baseUrl: '/base',
    paths: {
        'jquery': 'bower_components/jquery/dist/jquery',
        'jquerycookie': 'bower_components/jquery-cookie/jquery.cookie',
        'chai': 'bower_components/chai/chai'
    }
});

require(tests, function () {
    mocha.run();
});
