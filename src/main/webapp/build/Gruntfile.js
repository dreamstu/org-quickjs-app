'use strict';
module.exports = function(grunt){
    var prefix = 'gallery';

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        banner:
            '/*'+
            '\n Copyright <%= grunt.template.today("yyyy")%>, Quickjs v1.0 dev'+
            '\n MIT Licensed'+
            '\n build time <%=grunt.template.today("yyyy-mm-dd HH:MM:ss")%>'+
            '\n ' +
            '*/' +
            '\n',
        clean:{
            pre:['dist'],
            end:['Gruntfile.js']
        },
        transport:{
            target:{
                options:{
                    /*paths:['seajs-modules'],*/
                    alias:'<%= pkg.alias %>',
                    idleading:prefix+'/<%= pkg.name%>/<%= pkg.version%>/'
                },
                files:[{
                    expand:true,
                    debug:true,
                    src:['*.js','src/**/*.css','src/**/*.js','!Gruntfile.js'],
                    dest:'dist'
                }]
            }
        },
        concat:{
            options:{
                banner:'<%= banner%>',
                stripBanners:true
            },
            dist:{
                src:['dist/*.js','!dist/*-debug.js'],
                dest:'dist/concat/all.js'
            }
        },
        uglify:{
            options:{
                banner:'<%= banner%>'
            },
            dist:{
                src:'<%= concat.dist.src %>',
                dest:'../../'+prefix+'/<%= pkg.name%>/<%= pkg.version%>/<%= pkg.name%>.js'
            },
            src:{
                files:[{
                    expand: true,
                    cwd:'dist/src',
                    src:['**/*.js','**/*.css','!**/*-debug.js','!**/*-debug.css'],
                    dest:'src-dist'
                }]
            }
        },
        copy:{
            src:{
                files:[{
                    expand: true,
                    cwd: 'src-dist/',
                    src: '**',
                    dest:'../../'+prefix+'/<%= pkg.name%>/<%= pkg.version %>/src/'
                }]
            },
            debug:{
                expand: true,
                cwd:'dist/',
                src:['**/*-debug.js','**/*-debug.css'],
                dest:'../../'+prefix+'/<%= pkg.name%>/<%= pkg.version %>/'
            }
        }
    });

    grunt.registerTask('default',['clean:pre','transport','concat','uglify','copy','clean:end']);
}