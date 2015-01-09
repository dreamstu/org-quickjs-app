var shell = require('shelljs');
var fs = require('fs');
var path = require('path');
var settings = require('./settings');

var $pwd = settings.pwd,
    $build = settings.build;

shell.cd($pwd);
shell.echo('\n当前目录 '+ $pwd);
shell.echo('\n用户设定待构建目录:'+ $build);
shell.echo('\n开始拷贝构建配置文件到待构建目录:');
shell.cp('-f', ['build.js','Gruntfile.js','settings.js','install.js','package.json'], $build+'/');
shell.echo('\n构建配置文件已拷贝到待构建目录:');
shell.cd($build);
shell.echo('\n进入待构建目录 '+ $build);
shell.echo('\n准备开始执行构建 ...');
if(!settings.install || shell.exec('sudo node install').code == 0){
    if(shell.exec('sudo node build').code != 0){
        shell.echo('Error: script run failed');
        shell.exit(1);
    }
}
