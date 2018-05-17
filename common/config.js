'use strict'

var config = {}
config.qrCodeFilePath = '/Users/xiwan/Downloads/webwxgetmsgimg.jpeg';
config.upload = {};
config.upload.dest = '/Users/xiwan/Documents/uploads/'

config.host = {};
config.host.gamebox = 'https://gamebox.webapp.163.com';
config.host.service = 'https://service.mkey.163.com';

config.routes = {
	qrcodeScan: config.host.gamebox + '/api/qrcode/scan',
	confirmLogin: config.host.service + '/api/qrcode/confirm_login',
	loginRecords: '/api/security/login_records',
	forRegister: '/mpay/games/$/devices/$/users?for_register=0',
	test: '',	
};

config.app = {
	cv: '0.0.0',
	ci: 'c30df810-867f-4d88-bfd7-40d0d7571afc',
	cp: 'wx-i',
	device_id: 'aeavvzoc2bycelbl-d'	
}

config.token = [
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