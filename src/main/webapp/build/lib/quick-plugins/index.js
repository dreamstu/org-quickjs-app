/**
 * Created by johnkim on 15-1-19.
 */
var quick = module.exports = {};
quick.log = require('./lib/log');
quick._ = require('lodash');
var verbose = quick.log.verbose;
quick.package = require('./package.json');
quick.version = quick.package.version;