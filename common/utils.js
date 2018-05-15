'use strict'
var _ = require('lodash');

var utils = {};

utils.protectBlock = function(handler, params, next){
	try {
		handler.apply(null, params);
	} catch (err) {
		console.log(err);
		next(err);
	}
};


module.exports = utils;