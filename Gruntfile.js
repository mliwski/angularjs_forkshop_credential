"use strict";

module.exports = function(grunt) {

    var pkg = grunt.file.readJSON('package.json');

    // Project configuration.
    grunt.initConfig({
        copy: {
            dist : { nonull: true, expand: true, cwd: "src", src: ['**/**'], dest: 'dist/', timestamp: true},
            dev : { nonull: true, expand: true, cwd: "src", src: ['**/**'], dest: 'tmp/', timestamp: true}
        },
        clean: {
            dist : { src: 'dist/', force: true},
            dev : { src: 'tmp/', force: true}
        },
        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 8000,
                    base: 'tmp',
                    keepalive: false,
                    livereload: true,
                    open: true,
                    debug: false
                }
            }
        },
        watch: {
            html: {
                files: ['src/**/*.html', 'src/**/*.js', 'test/**/*.js'],
                tasks: ['compile', 'clean:dev', 'copy:dev'],
                options: {
                    livereload: true
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                ignores: ['src/libs/**/*.js']
            },
            config: ['Gruntfile.js'],
            src: ['src/**/*.js'],
            test: ['test/**/*.js']
        },
        karma: {
            unit: {
                configFile: 'test/karma.conf.js'
            }
        }
    });

    grunt.registerTask('project_banner_task', 'Print project banner', function() {
        grunt.log.writeln("");
        grunt.log.writeln(" ########################");
        grunt.log.writeln(" #	" + pkg.name + " V" + pkg.version + "	#");
        grunt.log.writeln(" ########################");
    });

    grunt.registerTask('help_task', 'print help options', function() {
        grunt.log.writeln(" Grunt commands:");
        grunt.log.writeln(" * help : Print this options");
        grunt.log.writeln(" * dist : Run tests and build distributable files");
        grunt.log.writeln(" * compile : Run tests and then build dev on tmp folder");
        grunt.log.writeln(" * dev : Compile and startup a dev server");
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');

    // Default task(s).
    grunt.registerTask('default', ['help']);
    grunt.registerTask('help', ['project_banner_task', 'help_task']);

    grunt.registerTask('compile', ['jshint']);
    grunt.registerTask('dev', ['project_banner_task', 'compile', 'clean:dev', 'copy:dev', 'connect', 'watch']);

    grunt.registerTask('dist', ['project_banner_task', 'compile', 'clean:watch', 'copy:dist']);
};
