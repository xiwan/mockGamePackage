var express = require('express');
var _ = require('lodash');
var async = require('async');
var multer = require('multer');
var path = require('path');

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

var upload = multer({ 
	storage: storage,
	fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
        return callback(new Error('Only images are allowed'))
    }
    callback(null, true);
  },
  limits:{
		fileSize: 2 * 1024 * 1024
  }});

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
			callback(null, qrImage.path, targetAccount.token);
		},
		function (qrImagePath, qrToken, callback) {
			qrcodeService.autoLogin(qrImagePath, qrToken, function(err, response, body) {
			  if (!err && response.statusCode == 200) {
					var info = JSON.parse(body);
				  console.log(info);
			    callback(null, info); 
			  } else {
			    callback(err);
			  }
			});
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
	var qrCodeFilePath = "";
	var qrToken = "";
	async.waterfall([
		function (callback) { 
			qrCodeFilePath = req.body.qrCodeFilePath;
			if (qrCodeFilePath == null) {
				return callback("no_qrcode_found");
			}
			qrToken = req.body.qrToken;
			if (qrToken == null) {
				return callback("no_token_found");
			}
			// qrcodeService.scanImage
			qrcodeService.scanImage(qrCodeFilePath, function(err, response, body) {
			  if (!err && response.statusCode == 200) {
			  	var info = JSON.parse(body);
			  	console.log(info);
			    callback(null, info); 
			  } else {
			    callback(err);
			  }
			});
		},

		function (info, callback) { 
			if (info.code == 0) {
				// qrcodeService.confirmLogin
				qrcodeService.confirmLogin(info.qrcode_info, qrToken, function(err, response, body) {
				  if (!err && response.statusCode == 200) {
						var info = JSON.parse(body);
					  console.log(info);
				    callback(null, info); 
				  } else {
				    callback(err);
				  }
				});
			}else {
				callback(null, info);
			}
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