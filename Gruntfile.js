module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'translator.min.js': ['translator.js']
        }
      }
    },
    jshint: {
      files: ['gruntfile.js', 'translator.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: false,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'karma:unit:run']
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        runnerPort: 9999,
        background: true,
        // browsers: ['PhantomJS', 'ChromeCanary', 'Firefox', 'Safari']
        browsers: ['ChromeCanary']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('test', ['jshint', 'karma']);

  grunt.registerTask('default', ['jshint', 'karma', 'uglify']);

};