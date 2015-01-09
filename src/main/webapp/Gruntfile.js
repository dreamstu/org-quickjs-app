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
                    alias:'<%= pkg.spm.alias %>',
                    idleading:prefix+'/<%= pkg.name%>/<%= pkg.version%>/'
                },
                files:[{
                    expand:true,
                    debug:false,
                    src:['**/*.js','**/*.css'],
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
                src:'<%=concat.dist.dest %>',
                dest:'../../'+prefix+'/<%= pkg.name%>/<%= pkg.version%>/<%= pkg.name%>.js'
            }
        }
    });
    /*grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-cmd-transport');*/

    grunt.registerTask('default',['clean:pre','transport','concat','uglify','clean:end']);
}