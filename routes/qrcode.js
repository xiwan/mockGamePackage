var express = require('express');
var _ = require('lodash');
var async = require('async');

var config = require('../common/config.js');
var masterdb = require('../common/masterdb.js');
var qrcodeService = require('../service/qrcode.js');
var utils = require('../common/utils.js');

var router = express.Router();

/* POST sendQrcode. */
router.post('/sendQrcode', function(req, res, next) {
	async.waterfall([

	], 
	function(err, results){
	  if (err) {
	    next(err);
	  } else {
	    res.send(results);
	  }
	});
});

/* POST autoLogin. */
router.post('/autoLogin', function(req, res, next) {
	async.waterfall([
		function (callback) { // qrcodeService.scan
			qrcodeService.scan(config.qrCodeFilePath, function(err, response, body){
				if (!err && response.statusCode == 200) {
					var info = JSON.parse(body);
					console.log(info)
					if (info.code == 0) {
						callback(null, info.qrcode_info);
					}else {
						callback(info);
					}
				} else {
					callback(err);
				}
			});
		},
		function (qrcodeInfo, callback) { // qrcodeService.confirmLogin
			qrcodeService.confirmLogin(qrcodeInfo, function(err, response, body) {
				if (!err && response.statusCode == 200) {
					var info = JSON.parse(body);
					callback(null, info);	
				} else {
					callback(err);
				}
			});
		}
	], 
	function(err, results){
	  if (err) {
	    next(err)
	  } else {
	    res.send(results);
	  }
	});
});

module.exports = router;