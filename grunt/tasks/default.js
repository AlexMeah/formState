module.exports = function (grunt) {
    grunt.registerTask('default', [
        'test',
        'uglify',
        'copy'
    ]);
};