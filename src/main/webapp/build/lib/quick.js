/**
 * Created by dreamstu on 2015/1/16.
 */
var quick = module.exports = {};
quick.log = require('./log');
quick._ =  require('lodash');
quick.util = require('grunt-legacy-util');
var verbose = quick.log.verbose;
quick.package = require('../package.json');
quick.version = quick.package.version;

var option = qRequire('option');

function qRequire(name) {
    return quick[name] = require('./' + name);
}