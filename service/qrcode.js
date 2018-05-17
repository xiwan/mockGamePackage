'use strict'

var fs = require('fs');
var jsQR = require('jsqr');
var Canvas = require('canvas');
var url = require('url');
var queryString = require( "querystring" );
var request = require('request');
var _ = require('lodash');
var async = require('async');

var config = require('../common/config.js');

var qrcode = {

	_parse: function(qrCodeFilePath, cb){
			fs.readFile(qrCodeFilePath, function(err, data) {
	    if (err) {
	    	return cb(err);
	    }
	    var img = new Canvas.Image; // Create a new Image
	    img.src = data;	
			    
			// Initialiaze a new Canvas with the same dimensions
		    // as the image, and get a 2D drawing context for it.
	    var canvas = new Canvas(img.width, img.height);
	    var ctx = canvas.getContext('2d');
	    ctx.drawImage(img, 0, 0, img.width, img.height);
	    var imageData = ctx.getImageData(0, 0, img.width, img.height);
	    const code = jsQR(imageData.data, img.width, img.height);
			if (code) {
				var qrCodeUrl = code.data;
				// parses the request url
		    var theUrl = url.parse( qrCodeUrl );
		    // gets the query part of the URL and parses it creating an object
		    var queryObj = queryString.parse( theUrl.query );
		    var uuid = queryObj.uuid;
		  	cb(null, uuid);
			}else {
				cb("no uuid");
			}
		});
	},

	scan: function(qrCodeFilePath, cb) {
		async.waterfall([
			function (callback) {
				qrcode._parse(qrCodeFilePath, callback);
			},
			function(uuid, callback){
				var cv = '&cv=' + config.app.cv;
				var ci = '&ci=' + config.app.ci;
				var cp = '&cp='	+ config.app.cp;
				var uuid = 'uuid=' + uuid;
				var params = uuid+cp+ci+cv;
				var qrcodeScan = config.routes.qrcodeScan+'?'+params;
				var options = {
					url: qrcodeScan,
					headers: config.headers
				};
				_.extend(options.headers, {'content-length': Buffer.byteLength(queryString.stringify(params))});
				console.log(options);
				request.get(options, callback);
			}
		], cb);
	},

	confirmLogin: function(qrcodeInfo, qrToken, cb){
		async.waterfall([
			function (callback) {
				var uuid = qrcodeInfo.uuid;
				var id = qrcodeInfo.game.id;
				var name = qrcodeInfo.game.name;
				var qrcodeChannelName = qrcodeInfo.game.qrcode_channel_name;
				var iconUrl = qrcodeInfo.icon_url;	
				
				var form = {
					token: qrToken||config.token[0],
					uuid: uuid,
					src_game_id: id,
					device_id: config.app.device_id,
					cp: config.app.cp,
					cv: config.app.cv,
					ci: config.app.ci
				}
				callback(null, form);			
			},
			function(form, callback) {
				var options = {
					url: config.routes.confirmLogin,
					headers: config.headers,
					form: form
				};
				_.extend(options.headers, {'content-length': Buffer.byteLength(queryString.stringify(form)) });
				console.log(options);
				request.post(options, callback);
			}
		], cb);


	}
	
};

module.exports = qrcode;