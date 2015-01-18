var shell = require('shelljs');
var settings = require('./settings');
var quick = require('./lib/quick');

shell.echo('\n当前目录 '+ shell.pwd());
shell.echo('\n开始拷贝构建配置文件到待构建目录:');
shell.cp('-rf', ['build.js','Gruntfile.js','settings.js','package.json','node_modules'], settings.build+'/');
quick.log.ok('\n构建配置文件已拷贝到待构建目录:');
shell.echo('\n准备开始执行构建 ...');

/*
shell.echo("replace path.resolve('node_modules') to path.resolve('"+$base+"', 'node_modules')");
shell.sed('-i', "path.resolve('node_modules')", "path.resolve('"+$base+"', 'node_modules')", "node_modules/grunt/lib/grunt/task.js");
*/

shell.echo("replace path.resolve('node_modules') to path.resolve('"+settings.pwd+"', 'node_modules')");
shell.sed('-i', "path.resolve('node_modules')", "path.resolve('"+settings.pwd+"', 'node_modules')", "node_modules/grunt/lib/grunt/task.js");

require('./build')(quick).start();