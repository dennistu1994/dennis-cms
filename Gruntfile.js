module.exports = function(grunt) {

  grunt.initConfig({
    jasmine: {
      default: {

      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('default', function(){
    console.log('no default task');
  });

};
