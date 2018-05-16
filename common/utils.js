'use strict'
var _ = require('lodash');
var crypto = require('crypto');

var utils = {};

utils.protectBlock = function(handler, params, next){
  handler.apply(null, params);
};

utils.md5 = function(text){
  return crypto.createHash('md5').update(text).digest('hex');
};


module.exports = utils;