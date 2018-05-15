'use strict'

var config = {}
config.qrCodeFilePath = '/Users/xi.wan/Documents/dev/mockGamePackage/public/images/WechatIMG285.jpeg';
config.host = 'https://gamebox.webapp.163.com';

config.routes = {
	qrcodeScan: config.host + '/api/qrcode/scan',
	confirmLogin: config.host + '/api/qrcode/confirm_login',
	loginRecords: '/api/security/login_records',
	test: '',	
};

config.app = {
	cv: '0.0.0',
	ci: 'c30df810-867f-4d88-bfd7-40d0d7571afc',
	cp: 'wx-i',
	device_id: 'aeavvzoc2bycelbl-d',
	token: 'aebfv3lqdi2hlhyi@1-eyJzIjogIjU3MTI3MDIzMmI2NGE2MzE1NTJlM2E5ZjMwNGQwYmRjIiwgInQiOiAxfSAg'	
}


config.headers = {
	'Connection': 'keep-alive',
	'Accept': '*/*',
	'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E302 MicroMessenger/6.6.6 NetType/WIFI Language/en',
	'Content-Type': 'application/x-www-form-urlencoded',
	'Referer': 'http:s://servicewechat.com/wxe6d53c9396761c4a/23/page-frame.html',
	'Accept-Language': 'en-us',
	'Accept-Encoding': 'br, gzip, deflate'
}

module.exports = config;