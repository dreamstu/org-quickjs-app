define("gallery/test/0.1.0/test-debug", [ "./src/module1-debug", "./src/module2-debug" ], function(require, exports, module) {
    /*
 * test
 * https://github.com/dreamstu/org-quickjs-app
 *
 * Copyright (c) 2015 dreamstu
 * Licensed under the MIT license.
 */
    var m1 = require("./src/module1-debug");
    var m2 = require("./src/module2-debug");
    module.exports.test = {
        //write your code
        init: function() {
            m1.main();
            m2.main();
        }
    };
});