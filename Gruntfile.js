module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({


        uglify: {
            js: {
                files: {
                    'dist/kompasroos.min.js': [
                        'app/bower_components/angular/angular.js',
                        'app/bower_components/angular-route/angular-route.js',
                        'app/bower_components/angular-cookies/angular-cookies.min.js',
                        'app/bower_components/angular-resource/angular-resource.min.js',
                        'app/bower_components/angular-bootstrap/ui-bootstrap.js',
                        'app/bower_components/angular-bootstrap-slider/slider.js',
                        'app/bower_components/seiyria-bootstrap-slider/js/bootstrap-slider.js',
                        'app/app.js',
                        'app/main/main.js',
                        'app/main/kompasroosService.js',
                        'app/main/translationService.js'
                    ]

                }
            }
        },

        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'dist/kompasroos.css': [
                        'app/bower_components/bootstrap/dist/css/bootstrap.min.css',
                        'app/bower_components/angular-bootstrap/ui-bootstrap-csp.css',
                        'app/bower_components/seiyria-bootstrap-slider/dist/css/bootstrap-slider.css',
                        'app/app.css'
                    ]
                }
            }
        },

        processhtml: {
            options: {
                strip: true,
                data: {
                    builddate: Date().toLocaleString('nl_NL')
                }
            },
            dist: {
                files: {
                    'dist/index.html': ['app/index.html'],
                    'dist/main/main.html': ['app/main/main.html']
                }
            }
        },

        copy: {
            main: {
                files: [
                    {src: ['app/json/canopies.json'], dest: 'dist/json/canopies.json'},
                    {src: ['app/json/manufacturers.json'], dest: 'dist/json/manufacturers.json'},

                    {src: ['app/template/accordion/accordion.html'], dest: 'dist/template/accordion/accordion.html'},
                    {src: ['app/template/accordion/accordion-group.html'], dest: 'dist/template/accordion/accordion-group.html'},

                    {src: ['app/template/modal/backdrop.html'], dest: 'dist/template/modal/backdrop.html'},
                    {src: ['app/template/modal/window.html'], dest: 'dist/template/modal/window.html'},

                    {src: ['app/favicon.ico'], dest: 'dist/favicon.ico'},

                    {src: ['app/img/kompasroos128.png'], dest: 'dist/img/kompasroos128.png'},
                    {src: ['app/img/nl.png'], dest: 'dist/img/nl.png'},
                    {src: ['app/img/gb.png'], dest: 'dist/img/gb.png'},


                    {expand: true, flatten: true, src: ['app/bower_components/bootstrap/fonts/glyphicons-halflings-regular.*'], dest: 'dist/fonts/'},


                    //{src: ['app/bower_components/bootstrap/dist/css/bootstrap.min.css'], dest: 'dist/bower_components/bootstrap/dist/css/bootstrap.min.css'},
                    //{src: ['app/bower_components/angular-bootstrap/ui-bootstrap-csp.css'], dest: 'dist/bower_components/angular-bootstrap/ui-bootstrap-csp.css'},
                    //{src: ['app/bower_components/seiyria-bootstrap-slider/dist/css/bootstrap-slider.css'], dest: 'dist/bower_components/seiyria-bootstrap-slider/dist/css/bootstrap-slider.css'},
                    //{src: ['app/app.css'], dest: 'dist/app.css'}


                ],
            },
        },

        clean: ["dist/*"],

        connect: {
            server: {
                options: {
                    port: 9001,
                    base: 'dist',
                    keepalive: true
                }
            }
        }
    });


    // Load the plugin that provides the "clean" and "concat" task.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'uglify', 'cssmin', 'copy', 'processhtml', 'connect']);

};

