module.exports = function (grunt) {

  require('jit-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    html2js: {
      options: {
        base: 'src/templates',
        indentString: '  '
      },
      makeApiAngular: {
        src: ['src/templates/**/*.html'],
        dest: 'dist/makeapi-angular.templates.js'
      },
    },

    copy: {
      main: {
        files: [{
          src: 'src/makeapi-angular.js',
          dest: 'dist/makeapi-angular.js'
        }]
      }
    },

    watch: {
      src: {
        files: ['src/**/*'],
        tasks: ['build'],
        options: {
          spawn: false
        }
      }
    }

  });

  grunt.registerTask('build', [
    'html2js',
    'copy'
  ]);

  grunt.registerTask('dev', [
    'build',
    'watch'
  ]);

};
