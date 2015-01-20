/***
 * 扩展string trim函数,作用为去掉字符串中所有的空字符串
 * @param str
 * @returns {XML|string|void}
 */
String.prototype.trim = function(){
    return this.replace(/(^\s*)|(\s*$)/g,"");
};

'use strict';

module.exports = function(quick) {
    var exports = {};
    var shell = require('shelljs');
    var fs = require('fs');
    var path = require('path');
    var settings = require('./settings');
    var prompt = require('prompt');

    var $cmd = '';
    var $build = settings.build;
    var $logs = settings.logs;
    var $base = settings.pwd;

    var $isStart = false; // 是否开始构建
    var $versions = [];
    var $dirs = [];

    exports.start = function(){

    	shell.echo('\n开始拷贝构建配置文件到待构建目录:');
    	shell.cp('-rf', ['node_modules','build.js','Gruntfile.js','settings.js','package.json'], $build+'/');
    	quick.log.ok('\n构建配置文件已拷贝到待构建目录:');

    	shell.echo('\n准备开始执行构建 ...');
        shell.echo('\n用户设定待构建目录:'+ $build);
        shell.cd($build);
        shell.echo('\n进入待构建目录 '+ $build);

        shell.echo("replace path.resolve('node_modules') to path.resolve('..', 'node_modules')");
        shell.sed('-i', "path.resolve('node_modules')", "path.resolve('..', 'node_modules')", "node_modules/grunt/lib/grunt/task.js");

        if( !shell.test('-d', $logs) ){
            shell.mkdir($logs);
            quick.log.ok('创建了日志目录 '+ $logs);
        }

        //获取目标构建目录的可构建组件名称数组
        $dirs = exports.findModuleList($build);

        quick.log.success('\n可构建的组建列表：'+$dirs.join(', '));
        shell.echo('\n共 '+$dirs.length+' 个组件');
        //询问式构建开始
        exports.main();
    };

    exports.findModuleList = function(buildpath){
        shell.cd(buildpath);
        shell.echo('\n当前目录 '+ buildpath);
        return shell.ls('./').filter(function(file) {
            // 仅返回目录，并且过滤掉 node_modules 和 module-tpl 两个非组件目录
            // 以及其他一些特殊组件
            return !/^(node_modules|jquery|seajs|class|events)$/i.test(file) && shell.test('-d', file);
        });
    };

    //构建循环逻辑
    exports.main = function(welocme){

        prompt.message = '[' + '?'.green + ']';
        prompt.delimiter = ' ';

        quick.log.success((welocme || '请输入要构建的模块名')+'\t[全部构建请输入 all]:\n');

        prompt.start();

        var options = {
            properties:{
                name: {
                    message: 'Project name',
                    validator: /^[\w\-]+$/,
                    warning: 'Must be only letters, numbers, dashes or underscores.'
                }
            }
        };

        prompt.get(options,function (err, result) {
            $cmd = result.name;
            if ( $cmd === "all") {
                quick.log.debug('all');
            } else if ( shell.test('-d', $cmd) ) {
                $dirs = [$cmd];
            } else {
                $dirs = [];
            }
            if ( $dirs.length ) {
                shell.rm('-rf', settings.buildlog);
                shell.echo('\n清理日志目录 :'+settings.buildlog+'\n');
                setTimeout(function(){
                    shell.echo($dirs.join(', '));
                    shell.echo('\n即将开始，共 '+$dirs.length+' 个组件');
                }, 1000);
                setTimeout(function(){
                    exports.run($dirs);
                }, 2000);
            } else {
                shell.echo('\n输入错误或组件名不存在\n');
                exports.main('请重新输入要构建的模块名');
            }
        });
    };

    /***
     * 运行构建逻辑
     * @param dirs 需要构建的组件文件夹
     */
    exports.run = function(dirs){
        var name, version, pkgpath;
        if( dirs.length ){
            if( $isStart ) {
                shell.echo('\n还有 '+ dirs.length + ' 个组件等待构建...\n');
            }
            $isStart = true;
            name = dirs.shift();
            pkgpath = $build+path.sep+name+path.sep+'package.json';

            shell.echo("\n找到package配置文件:"+pkgpath);

            version = exports.getPkgVal('version', pkgpath);

            shell.echo('\n当前是 '+name + '@' + version +'\n');

            $versions.push( '"'+name+'": ["'+ version +'"]');

            if ( $cmd === 'version' ) {
                exports.run(dirs);
            } else {
                if ( name !== 'seajs' ) {
                    // seajs 需要使用自己的构建文件
                    shell.cp('-f', 'Gruntfile.js', name+'/');
                }

                shell.cd(name);

                shell.exec('grunt', function(code, output) {
                    // 疑问 2013-04-11
                    // 仅执行 grunt 命令，可以得到完整的 output 内容
                    // 执行 grunt jshint 或 grunt qunit 就可不到完整的 output 内容，为什么？

                    if( output.indexOf('without errors') === -1 ){
                        (output).to($logs+'/'+name+'.log');
                    }
                    exports.run(dirs);
                });
            }
        }else{
            fs.appendFile($logs+path.sep+'version.txt', '\t'+$versions.join('\n'));
            shell.echo('\n构建完毕.\n');
            var temp = settings.del;
            for(var i = 0; i<temp.length;i++){
                shell.rm('-rf', $build + path.sep + temp[i]);
                shell.echo("已删除:"+$build + path.sep + temp[i]);
            }
            //shell.exit(1);
        }
    };

    /***
     * 获取json配置文件的某项值
     * @param key
     * @param file
     * @returns {*}
     */
    exports.getPkgVal = function(key, file){
        var result;
        key = key || '';
        file = file || 'package.json';
        try {
            // 注意；readFileSync的返回值是object类型，不是string类型
            result = JSON.parse(fs.readFileSync(file));
            return key ? result[key] : result;
        } catch(e) {
            throw Error('getPkgVal(): JSON.parse error');
        }
    };
    
    return exports;
};



