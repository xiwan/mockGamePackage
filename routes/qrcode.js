var express = require('express');
var _ = require('lodash');
var async = require('async');
var multer = require('multer');

var config = require('../common/config.js');
var masterdb = require('../common/masterdb.js');
var qrcodeService = require('../service/qrcode.js');
var utils = require('../common/utils.js');

var router = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.upload.dest)
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
  }
});

var upload = multer({ storage: storage });
/* POST upload. */
router.post('/upload', upload.single('qrImage'),function(req, res, next) {
	async.waterfall([
		function (callback){
			var username = req.body.username;
			var accounts = _.filter(masterdb.accounts, function(obj){
				return obj.username == username;
			});
			if (accounts.length == 0) {
				return callback("not_found_user");
			}
			var targetAccount = accounts[0];
			var qrImage = req.file;
			callback(null, targetAccount, qrImage.path);
		},
		function (account, qrImagePath, callback) {

			callback(null, qrImagePath);
		}
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
		function (callback) {
			var qrCodeFilePath = req.body.qrCodeFilePath;
			if (qrCodeFilePath == null) {
				return callback("no_qrcode_found");
			}
			var qrToken = req.body.qrToken;
			if (qrToken == null) {
				return callback("no_token_found");
			}
			callback(null, qrCodeFilePath, token);
		}
		function (qrCodeFilePath, qrToken, callback) { // qrcodeService.scan
			qrcodeService.scan(qrCodeFilePath, function(err, response, body){
				if (!err && response.statusCode == 200) {
					var info = JSON.parse(body);
					console.log(info)
					if (info.code == 0) {
						callback(null, info.qrcode_info, qrToken);
					}else {
						callback(info);
					}
				} else {
					callback(err);
				}
			});
		},
		function (qrcodeInfo, qrToken, callback) { // qrcodeService.confirmLogin
			qrcodeService.confirmLogin(qrcodeInfo, qrToken, function(err, response, body) {
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