'use strict'

var env = process.env.NODE_ENV;

var config = {}
config.upload = {};
config.upload.dest = (env == 'development'?'/Users/xiwan/Documents/uploads/':'/home/uploads/');

config.host = {};
config.host.gamebox = 'https://gamebox.webapp.163.com';
config.host.service = 'https://service.mkey.163.com';
config.host.local = (env == 'development'?'http://localhost:3000':'http://118.25.187.134:3000');

config.routes = {
	qrcodeScan: config.host.gamebox + '/api/qrcode/scan',
	confirmLogin: config.host.gamebox + '/api/qrcode/confirm_login',
	loginRecords: config.host.service + '/api/security/login_records',
	forRegister: config.host.service + '/mpay/games/$/devices/$/users?for_register=0',
	autoLogin: config.host.local + '/qrcode/autoLogin',
	test: '',	
};

config.app = {
	cv: '0.0.0',
	ci: 'c6d25bf2-75c0-42b1-b4c5-cedd487d881a',
	cp: 'wx-i',
	device_id: 'aeavv77ncrzwjqql-d'	
}

config.token = [
	'aebfusjdkawivcgy@1-eyJzIjogImY5YjRjMDQ3YjM3YmQ3ODY5ZWNlYzExMzhmMjQ1YTM5IiwgInQiOiAxfSAg',
	'aebfv3lqdi2hlhyi@1-eyJzIjogIjU3MTI3MDIzMmI2NGE2MzE1NTJlM2E5ZjMwNGQwYmRjIiwgInQiOiAxfSAg',
	'aebfmtcds4ekvm2t@1-eyJzIjogInlkXzIwMDAwMDAwOGU3NDZlZWNhODJmNGEyOWRiMGRkOTY3MDY3YzQ5OGUiLCAidCI6IDcsICJ1X2kiOiAiNjJGRDU0NDVEODA0NjdENTk0RDAyQTkwMTVGNjI2Qzk0QUYzREMwQUQwNEYyODVDRjkzODk0RjNBRTYwOEZBNTExOUMwQTI4RTkxRTFCOUJFODU0NzdEOTgxNkEyNUUxIn0g'
];


config.headers = {
	'connection': 'keep-alive',
	'accept': '*/*',
	'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E302 MicroMessenger/6.6.6 NetType/WIFI Language/en',
	'content-type': 'application/x-www-form-urlencoded',
	'referer': 'https://servicewechat.com/wxe6d53c9396761c4a/23/page-frame.html',
	'accept-language': 'en-us',
	'accept-encoding': 'br, gzip, deflate'
}



module.exports = config;