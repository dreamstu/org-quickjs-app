/**
 * Created by johnkim on 1/9/15.
 */
var pwd = '/home/johnkim/Documents/git/org-quickjs-app/src/main/webapp/build';
module.exports={
    //配置待构建路径
    pwd:pwd,
    build:'/home/johnkim/Documents/git/org-quickjs-app/src/main/webapp/src/js/seajs-module/static/page',
    logs:pwd+'/logs',
    buildlog:pwd+'/build_log',
    del:['node_modules','settings.js','Gruntfile.js','build.js','package.json'],
    prefix:'gallery'
};