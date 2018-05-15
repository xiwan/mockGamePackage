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

utils.finalCallback = function(err, results){
  if (err) {
    throw err;
  } else {
    res.send(results);
  }
}

module.exports = utils;