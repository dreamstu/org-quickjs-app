/*
 * test
 * https://github.com/dreamstu/org-quickjs-app
 *
 * Copyright (c) 2015 dreamstu
 * Licensed under the MIT license.
 */
var m1 = require('./src/module1');
var m2 = require('./src/module2');
module.exports.test = {
	//write your code
    init:function(){
        m1.main();
        m2.main();
    }
};
