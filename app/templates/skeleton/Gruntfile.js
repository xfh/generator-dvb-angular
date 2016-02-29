/*jslint node: true */
'use strict';

var pkg = require('./package.json');
var globs = require('./globbing-util.js');

module.exports = function (grunt) {

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        connect: {
            options: {
                port: 9001,
                hostname: 'localhost', // '*' verwenden um remote auf den Server zuzugreifen
                //hostname: '*',
                middleware: function (connect, options, middlewares) {
                    var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
                    return [proxy].concat(middlewares);
                }
            },
            dev: {
                proxies: [
                    {
                        context: '/kitadmin',
                        host: 'localhost',
                        port: 8080,
                        https: false,
                        xforward: false,
                        headers: {
                            'Connection': 'close'
                        }
                    }
                ]
            },
            devBackend: {
                proxies: [
                    {
                        context: '/kitadmin',
                        host: 'kita-dev.dvbern.ch',
                        port: 80, // use Application published via Apache
                        https: false,
                        xforward: false,
                        headers: {
                            'Connection': 'close'
                        }
                    }
                ]
            }
        },
        watch: {
            main: {
                options: {
                    livereload: true,
                    livereloadOnError: false,
                    spawn: false
                },
                files: [globs.createFolderGlobs(['*.js', '*.less', '*.html']), '!_SpecRunner.html', '!.grunt'],
                tasks: [] //all the tasks are run dynamically during the watch event handler
            },
            less: {
                files: [globs.createFolderGlobs(['*.less'])],
                tasks: ['less:development'],
                options: {
                    spawn: true
                }
            },
            css: {
                files: ['temp/app.css'],
                options: {
                    livereload: true
                }
            }
        },
        jshint: {
            main: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: globs.createFolderGlobs('*.js')
            }
        },
        jscs: {
            options: {
                config: '.jscsrc',
                verbose: false // If you need output with rule names http://jscs.info/overview.html#verbose
            },
            main: {
                src: [globs.createFolderGlobs('*.js')]
            }
        },
        clean: {
            before: {
                src: ['dist', 'temp']
            },
            after: {
                src: ['temp']
            }
        },
        less: {
            production: {
                options: {},
                files: {
                    'temp/app.css': '<%= appLess %>'
                }
            },
            development: {
                options: {
                    rootpath: '../' // because app.css is storead in a nested folder
                },
                files: {
                    'temp/app.css': '<%= appLess %>' // destination file and source file
                }
            }
        },
        ngtemplates: {
            main: {
                options: {
                    module: pkg.name,
                    htmlmin: '<%%= htmlmin.main.options %>'
                },
                src: [globs.createFolderGlobs('*.html'), '!index.html', '!_SpecRunner.html'],
                dest: 'temp/templates.js'
            }
        },
        copy: {
            main: {
                files: [
                    {src: ['img/**'], dest: 'dist/'},
                    {src: ['node_modules/font-awesome/fonts/**'], dest: 'dist/', filter: 'isFile', expand: true},
                    {src: ['node_modules/bootstrap/fonts/**'], dest: 'dist/', filter: 'isFile', expand: true}
                    //{src: ['node_modules/angular-ui-utils/ui-utils-ieshiv.min.js'], dest: 'dist/'},
                    //{src: ['node_modules/select2/*.png','node_modules/select2/*.gif'], dest:'dist/css/',flatten:true,expand:true},
                    //{src: ['node_modules/angular-mocks/angular-mocks.js'], dest: 'dist/'}
                ]
            }
        },
        dom_munger: {
            read: {
                options: {
                    read: [
                        {selector: 'script[data-concat!="false"]', attribute: 'src', writeto: 'appjs'},
                        {selector: 'link[rel="stylesheet"][data-concat!="false"]', attribute: 'href', writeto: 'appcss'}
                    ]
                },
                src: 'index.html'
            },
            update: {
                options: {
                    remove: ['script[data-remove!="false"]', 'link[data-remove!="false"]'],
                    append: [
                        {selector: 'body', html: '<script src="app.full.min.js"></script>'},
                        {selector: 'head', html: '<link rel="stylesheet" href="app.full.min.css">'}
                    ]
                },
                src: 'index.html',
                dest: 'dist/index.html'
            }
        },
        cssmin: {
            main: {
                src: ['temp/app.css', '<%%= dom_munger.data.appcss %>'],
                dest: 'dist/app.full.min.css'
            }
        },
        concat: {
            main: {
                src: ['<%%= dom_munger.data.appjs %>', '<%%= ngtemplates.main.dest %>'],
                dest: 'temp/app.full.js'
            }
        },
        ngAnnotate: {
            main: {
                src: 'temp/app.full.js',
                dest: 'temp/app.full.js'
            }
        },
        uglify: {
            main: {
                src: 'temp/app.full.js',
                dest: 'dist/app.full.min.js'
            }
        },
        htmlmin: {
            main: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                },
                files: {
                    'dist/index.html': 'dist/index.html'
                }
            }
        },
        //Imagemin has issues on Windows.
        //To enable imagemin:
        // - "npm install grunt-contrib-imagemin"
        // - Comment in this section
        // - Add the "imagemin" task after the "htmlmin" task in the build task alias
        // imagemin: {
        //   main:{
        //     files: [{
        //       expand: true, cwd:'dist/',
        //       src:['**/{*.png,*.jpg}'],
        //       dest: 'dist/'
        //     }]
        //   }
        // },
        karma: {
            options: {
                frameworks: ['jasmine'],
                files: [  //this files data is also updated in the watch handler, if updated change there too
                    '<%%= dom_munger.data.appjs %>', // TODO flatten dom_munger.data.appjs for Karma Versions > 0.8.*
                    'node_modules/angular-mocks/angular-mocks.js',
                    globs.createFolderGlobs('*-spec.js')
                ],
                logLevel: 'ERROR',
                reporters: ['mocha'],
                autoWatch: false, //watching is handled by grunt-contrib-watch
                singleRun: true
            },
            all_tests: {
                browsers: ['PhantomJS', 'Chrome', 'Firefox']
            },
            during_watch: {
                browsers: ['PhantomJS']
            }
        }
    });

    grunt.registerTask('build', ['jshint', 'jscs', 'clean:before', 'less:production', 'dom_munger', 'ngtemplates', 'cssmin', 'concat', 'ngAnnotate', 'uglify', 'copy', 'htmlmin', 'clean:after']);
    grunt.registerTask('serve', ['dom_munger:read', 'jshint', 'jscs', 'configureProxies:dev', 'connect:dev', 'less:development', 'watch']);
    grunt.registerTask('serve-backend', ['dom_munger:read', 'jshint', 'jscs', 'configureProxies:devBackend', 'connect:devBackend', 'less:development', 'watch']);
    grunt.registerTask('test', ['dom_munger:read', 'karma:all_tests']);

    grunt.event.on('watch', function (action, filepath) {
        //https://github.com/gruntjs/grunt-contrib-watch/issues/156

        var tasksToRun = [];

        if (filepath.lastIndexOf('.js') !== -1 && filepath.lastIndexOf('.js') === filepath.length - 3) {

            //lint the changed js file
            grunt.config('jshint.main.src', filepath);
            tasksToRun.push('jshint');
            grunt.config('jscs.main.src', filepath);
            tasksToRun.push('jscs:main');

            //find the appropriate unit test for the changed file
            var spec = filepath;
            if (filepath.lastIndexOf('-spec.js') === -1 || filepath.lastIndexOf('-spec.js') !== filepath.length - 8) {
                spec = filepath.substring(0, filepath.length - 3) + '-spec.js';
            }

            //if the spec exists then lets run it
            if (grunt.file.exists(spec)) {
                var files = [].concat(grunt.config('dom_munger.data.appjs'));
                files.push('node_modules/angular-mocks/angular-mocks.js');
                files.push(spec);
                grunt.config('karma.options.files', files);
                tasksToRun.push('karma:during_watch');
            }
        }

        //if index.html changed, we need to reread the <script> tags so our next run of karma
        //will have the correct environment
        if (filepath === 'index.html') {
            tasksToRun.push('dom_munger:read');
        }

        grunt.config('watch.main.tasks', tasksToRun);

    });
};
