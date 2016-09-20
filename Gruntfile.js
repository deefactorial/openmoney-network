var path = require('path');
var stylesheetsDir = 'assets/css';

module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        stylus: {
            compile: {
                options: {
                    paths: [stylesheetsDir],
                    'include css': true
                },
                files: {
                    'public/styles.css': stylesheetsDir + '/index.styl'
                }
            }
        },

        handlebars: {
            compile: {
                options: {
                    namespace: 'openmoney',
                    // namespace: function(filename) {
                    //   var names = filename.replace(/app\/templates\/(.*)(\/\w+\.hbs)/, '$1');
                    //   return names.split('/').join('.');
                    // },
                    commonjs: true,
                    processName: function(filename) {
                        return filename.replace('app/templates/', '').replace('.hbs', '');
                    }
                },
                src: "app/templates/**/*.hbs",
                dest: "app/templates/compiledTemplates.js",
                filter: function(filepath) {
                    var filename = path.basename(filepath);
                    // Exclude files that begin with '__' from being sent to the client,
                    // i.e. __layout.hbs.
                    return filename.slice(0, 2) !== '__';
                }
            }
        },

        copy: {
            main: {
                files: [
                    // includes files within path and its sub-directories
                    { expand: true,
                        src: ['node_modules/jquery-mobile-datepicker-wrapper/**/*.css'],
                        dest: 'public/assets/css'}
                ]
            }
        },

        mocha: {
            all: {
              options: {
                urls: [
                    'http://localhost/test.html'
                  ],
                  'ignore-ssl-errors': true,
                  run: true,
                  log: true,
                  logErrors: true,
                  reporter: 'Spec',
                  page: {
                    settings: {
                      XSSAuditingEnabled: false,
                      webSecurityEnabled: false,  // disable cors checks in phantomjs
                    },
                  },
              },
            }
        },

        watch: {
            scripts: {
                files: 'app/**/*.js',
                tasks: ['browserify', 'mocha'],
                options: {
                    interrupt: true
                }
            },
            templates: {
                files: 'app/**/*.hbs',
                tasks: ['handlebars'],
                options: {
                    interrupt: true
                }
            },
            stylesheets: {
                files: [stylesheetsDir + '/**/*.styl', stylesheetsDir + '/**/*.css'],
                tasks: ['stylus'],
                options: {
                    interrupt: true
                }
            },
            //images: {
            //    files: ['assets/images'],
            //    tasks: ['copy'],
            //    options: {
            //        interrupt: true
            //    }
            //
            //}
        },

        browserify: {
            basic: {
                src: [
                    'app/**/*.js'
                ],
                dest: 'public/mergedAssets.js',
                options: {
                    debug: true,
                    alias: [
                        './node_modules/handlebars/runtime.js:handlebars'
                      //  './node_modules/backbone.localstorage/backbone.localStorage-min.js:backboneLocalstorage'
                    ],
                    aliasMappings: [
                        {
                            cwd: 'app/',
                            src: ['**/*.js'],
                            dest: 'app/'
                        }
                    ],
                    shim: {
                        jquery: {
                            path: './node_modules/jquery/dist/jquery.min.js',
                            exports: '$'
                        },
                        "jquery-mobile" : {
                            path: './node_modules/jquery-mobile/dist/jquery.mobile.js',
                            exports: '$.mobile',
                            depends: [ 'jquery:$' ]
                        },
                        "jquery-validation": {
                            path: './node_modules/jquery-validation/dist/jquery.validate.js',
                            exports: '$.validator',
                            depends: [ 'jquery:$' ]
                        }
                        ,
                        "toolkit": {
                            path: './public/assets/theme-dashboard/dist/toolkit.js',
                            depends: [ 'jquery:$' ]
                        },
                        'buffer': {
                            path: './node_modules/buffer/index.js',
                            exports: 'Buffer'
                        },
                        "jquery.browser": {
                            path: './node_modules/jquery.browser/dist/jquery.browser.min.js',
                            exports: '$.browser',
                            depends: [ 'jquery:$' ]
                        }
                        // ,
                        // "datatables": {
                        //     path: './public/assets/datatables/datatables.js',
                        //     exports: '$.DataTable',
                        //     depends: [ 'jquery:$' ]
                        // }
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-mocha');

    grunt.registerTask('runNode', function () {
        grunt.util.spawn({
            cmd: 'node',
            args: ['./node_modules/nodemon/nodemon.js', 'index.js'],
            opts: {
                stdio: 'inherit'
            }
        }, function () {
            grunt.fail.fatal(new Error("nodemon quit"));
        });
    });


    grunt.registerTask('compile', ['handlebars', 'browserify', 'copy', 'stylus', 'watch']);

    // Run the server and watch for file changes
    grunt.registerTask('server', ['compile', 'runNode', 'watch']);

    // Default task(s).
    grunt.registerTask('default', ['compile']);

};
