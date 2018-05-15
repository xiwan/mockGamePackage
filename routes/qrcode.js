var express = require('express');
var config = require('../common/config.js');
var qrcodeService = require('../service/qrcode.js');
var _ = require('lodash');
var async = require('async');

var router = express.Router();

/* POST autoLogin. */
router.post('/autoLogin', function(req, res, next) {
	async.waterfall([
		function (callback) {
			qrcodeService.scan(config.qrCodeFilePath, function(err, response, body){
				if (!err && response.statusCode == 200) {
					var info = JSON.parse(body);
					callback(null, info);
				}else {
					callback(err);
				}
			});
		},
		function (qrcodeInfo, callback) {
			qrcodeService.confirmLogin(qrcodeInfo, function(err, response, body) {
				if (!err && response.statusCode == 200) {
					var info = JSON.parse(body);
					callback(null, info);	
				}else {
					callback(info);
				}
			});
		}
	], function(err, results){
		if (err) {
			res.send(err);
		}else {
			res.send(results);
		}
		
	});
});

module.exports = router;