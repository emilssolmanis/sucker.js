module.exports = function(grunt) {
    "use strict";
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        stylus: {
            dist: {
                files: {
                    'dist/css/style.css': ['assets/css/*.styl']
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            js: {
                src: [
                    'lib/js/**/*.js',
                    'assets/js/*.js'
                ],
                dest: 'dist/js/<%= pkg.name %>.js'
            },
            css: {
                src: [
                    'lib/css/**/*.css',
                    'dist/css/*.css'
                ],
                dest: 'dist/css/<%= pkg.name %>.css'
            }
        },
        cssmin: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            dist: {
                src: 'dist/css/<%= pkg.name %>.css',
                dest: 'public/css/<%= pkg.name %>.min.css'
            }
        },
        csslint: {
            dist: {
                src: "dist/css/style.css",
                rules: {
                    "import": false,
                    "overqualified-elements": 2
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                sourceMap: 'public/js/<%= pkg.name %>.min.map',
                sourceMappingURL: '/js/<%= pkg.name %>.min.map'
            },
            dist: {
                files: {
                    'public/js/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'assets/js/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true
                }
            }
        },
        watch: {
            grunt: {
                files: ['Gruntfile.js'],
                tasks: ['bower', 'jshint', 'stylus', 'csslint', 'concat', 'cssmin', 'uglify']
            },
            css: {
                files: ['assets/css/*.styl'],
                tasks: ['stylus', 'csslint', 'concat:css', 'cssmin']
            },
            js: {
                files: ['assets/js/*.js'],
                tasks: ['jshint', 'concat:js', 'uglify']
            }
        },
        bower: {
            dist: {
                install: {
                    options: {
                        layout: 'byType',
                        cleanTargetDir: true
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-css');

    grunt.registerTask('default', ['bower', 'jshint', 'stylus', 'csslint', 'concat', 'cssmin', 'uglify']);
};