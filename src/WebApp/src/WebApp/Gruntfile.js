/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {
  //load the tasks that we're gonna use
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-run');

  grunt.initConfig({
    //task to clean wwwroot and wwwroot/temp folder
    clean: {
      root: {
        src: ['wwwroot/**/*']
      },
      temp: {
        src: ['wwwroot/temp']
      }
    },
    //task to copy bootstrap fonts, htmls and css to wwwroot folder
    copy: {
      fonts: {
        files: [
          { expand: true, cwd: 'node_modules/bootstrap/dist/fonts/', src: ['**'], dest: 'wwwroot/fonts/' }
        ],
      },
      htmls: {
        files: [
          { expand: true, cwd: 'Scripts/', src: ['**/*.html'], dest: 'wwwroot/' },
        ],
      },
      csss: {
        files: [
          { expand: true, cwd: 'node_modules/bootstrap/dist/css', src: ['bootstrap.min.css'], dest: 'wwwroot/Style/' }
        ]
      },
    },
    //task to concat:
    //angular related files into a angular.js file
    //our app related files into a app.js file
    //
    //I create a temporary module.js and scripts.js and concatenate then into app.js 
    //to ensure our modules appear first in the app.js
    concat: {
      angular: {
        src: [
          'node_modules/angular/angular.min.js',
          'node_modules/angular-route/angular-route.min.js',
          'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
        ],
        dest: 'wwwroot/angular.js'
      },
      modules: {
        src: [
          'Scripts/app/**/*.module.js'
        ],
        dest: 'wwwroot/temp/modules.js'
      },
      scripts: {
        src: [
          'Scripts/app/**/*.js', '!Scripts/app/**/*.module.js', '!Scripts/app/**/*Spec.js'
        ],
        dest: 'wwwroot/temp/scripts.js'
      },
      app: {
        src: [
          'wwwroot/temp/modules.js', 'wwwroot/temp/scripts.js'
        ],
        dest: 'wwwroot/app.js'
      }
    },
  });

  //register a default task to execute clean, copy, concat and clean:temp tasks
  grunt.registerTask('default', ['clean', 'copy', 'concat', 'clean:temp']);
};