module.exports = function (grunt) {

  require('jit-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    htmlConvert: {
      options: {
        base: 'src/templates',
        indentString: '  '
      },
      makeApiAngularTemplates: {
        src: ['src/templates/**/*.html'],
        dest: 'dist/makeapi-angular.templates.js'
      },
    }

  });

  grunt.registerTask('build', [
    'htmlConvert'
  ]);

};
